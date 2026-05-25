import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAuthor } from '@/entities/book/api/fetchAuthor';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function mockResponse(data: unknown, ok = true) {
  mockFetch.mockResolvedValueOnce({
    ok,
    json: () => Promise.resolve(data),
  });
}

describe('fetchAuthor', () => {
  beforeEach(() => mockFetch.mockReset());

  it('should return author data', async () => {
    mockResponse({
      name: 'Frank Herbert',
      birth_date: '1920-10-08',
      photos: [123],
    });
    const result = await fetchAuthor('/authors/OL1A');
    expect(result).toEqual({
      name: 'Frank Herbert',
      birthDate: '1920-10-08',
      photoId: 123,
    });
  });

  it('should prepend /authors/ when key has no leading slash', async () => {
    mockResponse({ name: 'Frank Herbert' });
    await fetchAuthor('OL1A');
    expect(mockFetch).toHaveBeenCalledWith(
      `${OPEN_LIBRARY_BASE_URL}/authors/OL1A.json`
    );
  });

  it('should return undefined when response is not ok', async () => {
    mockResponse({}, false);
    const result = await fetchAuthor('/authors/OL1A');
    expect(result).toBeUndefined();
  });

  it('should return undefined when fetch throws', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    const result = await fetchAuthor('/authors/OL1A');
    expect(result).toBeUndefined();
  });

  it('should return undefined photoId when no valid photos', async () => {
    mockResponse({ name: 'Frank Herbert', photos: [-1, 0] });
    const result = await fetchAuthor('/authors/OL1A');
    expect(result?.photoId).toBeUndefined();
  });
});
