import { describe, it, expect, vi } from 'vitest';
import { fetchAllAuthors } from '@/entities/book/api/fetchAllAuthors';
import * as fetchAuthorModule from '@/entities/book/api/fetchAuthor';

vi.mock('@/entities/book/api/fetchAuthor');

const mockFetchAuthor = vi.mocked(fetchAuthorModule.fetchAuthor);

describe('fetchAllAuthors', () => {
  it('should return all authors', async () => {
    mockFetchAuthor
      .mockResolvedValueOnce({ name: 'Frank Herbert' })
      .mockResolvedValueOnce({ name: 'Isaac Asimov' });

    const result = await fetchAllAuthors(['/authors/OL1A', '/authors/OL2A']);
    expect(result).toHaveLength(2);
  });

  it('should filter out undefined authors', async () => {
    mockFetchAuthor
      .mockResolvedValueOnce({ name: 'Frank Herbert' })
      .mockResolvedValueOnce(undefined);

    const result = await fetchAllAuthors(['/authors/OL1A', '/authors/OL2A']);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Frank Herbert');
  });

  it('should deduplicate authors by name', async () => {
    mockFetchAuthor
      .mockResolvedValueOnce({ name: 'Frank Herbert' })
      .mockResolvedValueOnce({ name: 'frank herbert' });

    const result = await fetchAllAuthors(['/authors/OL1A', '/authors/OL2A']);
    expect(result).toHaveLength(1);
  });

  it('should return empty array when all authors are undefined', async () => {
    mockFetchAuthor.mockResolvedValue(undefined);
    const result = await fetchAllAuthors(['/authors/OL1A']);
    expect(result).toHaveLength(0);
  });
});
