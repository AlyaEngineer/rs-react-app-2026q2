import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/shared/mocks/server';
import { fetchAuthor } from '@/entities/book/api/fetchAuthor';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

const baseUrl = OPEN_LIBRARY_BASE_URL;

describe('fetchAuthor via MSW', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('should return author data', async () => {
    server.use(
      http.get(`${baseUrl}/authors/OL1A.json`, () => {
        return HttpResponse.json({
          name: 'Frank Herbert',
          birth_date: '1920-10-08',
          photos: [123],
        });
      })
    );
    const result = await fetchAuthor('/authors/OL1A');
    expect(result).toEqual({
      name: 'Frank Herbert',
      birthDate: '1920-10-08',
      photoId: 123,
    });
  });

  it('should prepend /authors/ when key has no leading slash', async () => {
    server.use(
      http.get(`${baseUrl}/authors/OL1A.json`, () => {
        return HttpResponse.json({
          name: 'Frank Herbert',
        });
      })
    );
    const result = await fetchAuthor('OL1A');
    expect(result?.name).toBe('Frank Herbert');
  });

  it('should return undefined when response is not ok', async () => {
    server.use(
      http.get(`${baseUrl}/authors/OL1A.json`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    const result = await fetchAuthor('/authors/OL1A');
    expect(result).toBeUndefined();
  });

  it('should return undefined when fetch throws', async () => {
    server.use(
      http.get(`${baseUrl}/authors/OL1A.json`, () => {
        throw new Error('Network error');
      })
    );
    const result = await fetchAuthor('/authors/OL1A');
    expect(result).toBeUndefined();
  });

  it('should return undefined photoId when no valid photos', async () => {
    server.use(
      http.get(`${baseUrl}/authors/OL1A.json`, () => {
        return HttpResponse.json({
          name: 'Frank Herbert',
          photos: [-1, 0],
        });
      })
    );
    const result = await fetchAuthor('/authors/OL1A');
    expect(result?.photoId).toBeUndefined();
  });
});
