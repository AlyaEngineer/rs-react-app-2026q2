import { describe, it, expect, vi } from 'vitest';
import { fetchBooks } from '../client';

type MockJsonResponse = {
  ok: boolean;
  status: number;
  statusText?: string;
  json: () => Promise<unknown>;
};

const mockFetch = (response: MockJsonResponse) => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));
};

const okResponse = (data: unknown): MockJsonResponse => ({
  ok: true,
  status: 200,
  json: () => Promise.resolve(data),
});

const errorResponse = (
  status: number,
  json: unknown = {},
  statusText = 'Error'
): MockJsonResponse => ({
  ok: false,
  status,
  statusText,
  json: () => Promise.resolve(json),
});

describe('fetchBooks API client', () => {
  it('returns docs array on successful response', async () => {
    const mockDocs = [{ key: '1', title: 'Mocked' }];

    mockFetch(okResponse({ docs: mockDocs }));

    const result = await fetchBooks('test');

    expect(result).toEqual(mockDocs);
  });

  it('throws API validation error with server message', async () => {
    mockFetch(
      errorResponse(422, {
        detail: [
          {
            msg: 'Value error, Query too short, must be at least 3 characters',
          },
        ],
      })
    );

    await expect(fetchBooks('hi')).rejects.toThrow(
      'Error 422: Value error, Query too short, must be at least 3 characters'
    );
  });

  it('falls back to message when JSON parsing fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('JSON Parse Crash')),
      })
    );

    await expect(fetchBooks('test')).rejects.toThrow(
      'Error 500: Invalid data format received from the server (HTML response)'
    );
  });

  it('returns fallback message for 500 without detail', async () => {
    mockFetch(errorResponse(500, {}));

    await expect(fetchBooks('test')).rejects.toThrow(
      'Error 500: Server is temporarily unavailable'
    );
  });

  it('returns fallback message for 400 without detail', async () => {
    mockFetch(errorResponse(400, {}));

    await expect(fetchBooks('test')).rejects.toThrow(
      'Error 400: Request cannot be completed. Please check your input.'
    );
  });
});
