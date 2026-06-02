import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { openLibraryApi } from '@/shared/api/openLibraryApi';
import { useBookListQuery } from './searchApi';
import { server } from '@/shared/mocks/server';
import { http, HttpResponse } from 'msw';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';
import React from 'react';

function wrapper({ children }: { children: React.ReactNode }) {
  const store = configureStore({
    reducer: { [openLibraryApi.reducerPath]: openLibraryApi.reducer },
    middleware: (m) => m().concat(openLibraryApi.middleware),
  });
  return React.createElement(Provider, { store, children });
}

describe('useBookListQuery', () => {
  it('returns transformed books and total count', async () => {
    server.use(
      http.get(`${OPEN_LIBRARY_BASE_URL}/search.json`, () =>
        HttpResponse.json({
          numFound: 1,
          docs: [
            {
              key: '/works/OL1W',
              title: 'Clean Code',
              author_name: ['Robert C. Martin'],
              first_publish_year: 2008,
              cover_i: 42,
            },
          ],
        })
      )
    );

    const { result } = renderHook(
      () => useBookListQuery({ term: 'clean code', page: 1 }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.totalBooks).toBe(1);
    expect(result.current.data?.books[0]).toMatchObject({
      title: 'Clean Code',
    });
  });

  it('passes correct query params', async () => {
    let url: string | undefined;

    server.use(
      http.get(`${OPEN_LIBRARY_BASE_URL}/search.json`, ({ request }) => {
        url = request.url;
        return HttpResponse.json({ numFound: 0, docs: [] });
      })
    );

    const { result } = renderHook(
      () => useBookListQuery({ term: 'javascript', page: 3 }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(url).toContain('q=javascript');
    expect(url).toContain('page=3');
    expect(url).toContain('limit=20');
  });

  it('sets isError on failure', async () => {
    server.use(
      http.get(
        `${OPEN_LIBRARY_BASE_URL}/search.json`,
        () => new HttpResponse(null, { status: 500 })
      )
    );

    const { result } = renderHook(
      () => useBookListQuery({ term: 'fail', page: 1 }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
