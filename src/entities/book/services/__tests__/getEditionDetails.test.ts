import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/shared/mocks/server';
import { getEditionDetails } from '../getEditionDetails';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

describe('getEditionDetails', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('should resolve edition -> work flow', async () => {
    server.use(
      http.get(`${OPEN_LIBRARY_BASE_URL}/books/OL1B.json`, () => {
        return HttpResponse.json({
          works: [{ key: '/works/W1' }],
        });
      }),
      http.get(`${OPEN_LIBRARY_BASE_URL}/works/W1.json`, () => {
        return HttpResponse.json({
          title: 'Dune',
          description: 'Epic',
          subjects: ['sci-fi'],
          covers: [10],
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

    const result = await getEditionDetails({ id: 'OL1B' });

    expect(result.title).toBe('Dune');
    expect(result.coverId).toBe(10);
    expect(result.subjects).toEqual(['sci-fi']);
  });

  it('should fallback to edition-only data when no work', async () => {
    server.use(
      http.get(`${OPEN_LIBRARY_BASE_URL}/books/OL1B.json`, () => {
        return HttpResponse.json({
          title: 'Edition Title',
          subjects: ['test'],
          covers: [5],
          authors: [{ key: '/authors/A1' }],
        });
      }),
      http.get(`${OPEN_LIBRARY_BASE_URL}/authors/:id.json`, () => {
        return HttpResponse.json({
          name: 'Author',
        });
      })
    );

    const result = await getEditionDetails({ id: 'OL1B' });

    expect(result.title).toBe('Edition Title');
    expect(result.subjects).toEqual(['test']);
  });

  it('should throw on edition fetch failure', async () => {
    server.use(
      http.get(`${OPEN_LIBRARY_BASE_URL}/books/OL1B.json`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(getEditionDetails({ id: 'OL1B' })).rejects.toThrow(
      'Failed to fetch edition details'
    );
  });
});
