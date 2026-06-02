import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/shared/mocks/server';
import { getWorkDetails } from '../getWorkDetails';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

describe('getWorkDetails', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('should return mapped work details', async () => {
    server.use(
      http.get(`${OPEN_LIBRARY_BASE_URL}/works/OL1W.json`, () => {
        return HttpResponse.json({
          title: 'Dune',
          description: 'Epic sci-fi',
          subjects: ['sci-fi', 'space'],
          covers: [1],
          authors: [{ author: { key: '/authors/A1' } }],
        });
      }),
      http.get(`${OPEN_LIBRARY_BASE_URL}/authors/:id.json`, () => {
        return HttpResponse.json({
          name: 'Frank Herbert',
          photos: [1],
        });
      })
    );

    const result = await getWorkDetails({ id: 'OL1W' });

    expect(result.title).toBe('Dune');
    expect(result.subjects).toEqual(['sci-fi', 'space']);
    expect(result.coverId).toBe(1);
    expect(result.authors.length).toBe(1);
  });

  it('should handle empty authors', async () => {
    server.use(
      http.get(`${OPEN_LIBRARY_BASE_URL}/works/OL1W.json`, () => {
        return HttpResponse.json({
          title: 'Dune',
        });
      }),
      http.get(`${OPEN_LIBRARY_BASE_URL}/authors/:id.json`, () => {
        return HttpResponse.json({});
      })
    );

    const result = await getWorkDetails({ id: 'OL1W' });

    expect(result.authors).toEqual([]);
  });

  it('should throw on failed request', async () => {
    server.use(
      http.get(`${OPEN_LIBRARY_BASE_URL}/works/OL1W.json`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(getWorkDetails({ id: 'OL1W' })).rejects.toThrow(
      'Failed to fetch work details'
    );
  });
});
