import { describe, it, expect, vi } from 'vitest';
import { generateCsv } from '@/features/flyout/model/generateCsv';
import type { Book } from '@/entities/book/model/types';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

vi.mock('@/entities/book/model/getCoverUrl', () => ({
  getCoverUrl: (id: number) =>
    `https://covers.openlibrary.org/b/id/${String(id)}-M.jpg`,
}));

const book: Book = {
  id: '/works/OL1W',
  title: 'Dune',
  author: 'Frank Herbert',
  year: 1965,
  coverId: 123,
};

describe('generateCsv', () => {
  it('should include book fields in csv content', async () => {
    const csv = await generateCsv([book]);

    expect(csv).toContain('Dune');
    expect(csv).toContain('Frank Herbert');
    expect(csv).toContain('1965');
    expect(csv).toContain(`${OPEN_LIBRARY_BASE_URL}${book.id}`);
  });

  it('should include headers', async () => {
    const csv = await generateCsv([book]);

    expect(csv).toContain('Title');
    expect(csv).toContain('Author');
  });
});
