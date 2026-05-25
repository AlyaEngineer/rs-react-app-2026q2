import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getBookDetails } from '@/entities/book/api/getBookDetails';
import * as fetchAllAuthorsModule from '@/entities/book/api/fetchAllAuthors';

vi.mock('@/entities/book/api/fetchAllAuthors');
const mockFetchAllAuthors = vi.mocked(fetchAllAuthorsModule.fetchAllAuthors);

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function mockResponse(data: unknown, ok = true) {
  mockFetch.mockResolvedValueOnce({
    ok,
    json: () => Promise.resolve(data),
  });
}

const workData = {
  title: 'Dune',
  description: 'A desert planet story',
  subjects: ['Science Fiction'],
  covers: [123],
  authors: [{ author: { key: '/authors/OL1A' } }],
};

const editionData = {
  title: 'Dune Edition',
  covers: [456],
  authors: [{ key: '/authors/OL1A' }],
};

describe('getBookDetails', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetchAllAuthors.mockResolvedValue([{ name: 'Frank Herbert' }]);
  });

  it('should fetch work details for work id', async () => {
    mockResponse(workData);
    const result = await getBookDetails('OL1W');
    expect(result.title).toBe('Dune');
    expect(result.description).toBe('A desert planet story');
    expect(result.coverId).toBe(123);
  });

  it('should fetch edition details for edition id ending with M', async () => {
    mockResponse({ ...editionData, works: undefined });
    const result = await getBookDetails('OL1M');
    expect(result.title).toBe('Dune Edition');
    expect(result.coverId).toBe(456);
  });

  it('should follow work link from edition', async () => {
    mockResponse({ ...editionData, works: [{ key: '/works/OL1W' }] });
    mockResponse(workData);
    const result = await getBookDetails('OL1M');
    expect(result.title).toBe('Dune');
  });

  it('should use fallbackCoverId when no covers in work', async () => {
    mockResponse({ ...workData, covers: undefined });
    const result = await getBookDetails('OL1W', undefined, 999);
    expect(result.coverId).toBe(999);
  });

  it('should use provided authorKeys instead of work authors', async () => {
    mockResponse(workData);
    await getBookDetails('OL1W', ['/authors/OL99A']);
    expect(mockFetchAllAuthors).toHaveBeenCalledWith(['/authors/OL99A']);
  });

  it('should throw when work fetch fails', async () => {
    mockResponse({}, false);
    await expect(getBookDetails('OL1W')).rejects.toThrow(
      'Failed to fetch work details'
    );
  });

  it('should throw when edition fetch fails', async () => {
    mockResponse({}, false);
    await expect(getBookDetails('OL1M')).rejects.toThrow(
      'Failed to fetch edition details'
    );
  });

  it('should use by_statement as contributor when edition has no authors', async () => {
    mockResponse({
      title: 'Some Book',
      by_statement: 'Ed. Board',
      works: undefined,
    });
    const result = await getBookDetails('OL1M');
    expect(result.authors).toEqual([
      { name: 'Ed. Board', isContributor: true },
    ]);
  });

  it('should extract description from object format', async () => {
    mockResponse({
      ...workData,
      description: { type: '/type/text', value: 'Object description' },
    });
    const result = await getBookDetails('OL1W');
    expect(result.description).toBe('Object description');
  });
});
