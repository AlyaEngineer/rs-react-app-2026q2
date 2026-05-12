import { describe, it, expect, vi, afterEach } from 'vitest';
import { getBooks } from '../getBooks';
import { fetchBooks } from '../../../../shared/api/client';

afterEach(() => {
  vi.clearAllMocks();
});

vi.mock('../../../../shared/api/client', () => ({
  fetchBooks: vi.fn(),
}));

describe('getBooks', () => {
  it('should return filtered mapped books from API response', async () => {
    const mockDocs = [
      {
        key: '/works/OL17276241W',
        title: 'How Google Works',
        author_name: ['Eric Schmidt', 'Jonathan Rosenberg'],
      },
      {
        key: '/works/OL17618370W',
        title: 'Clean Code',
        author_name: ['Robert C. Martin'],
      },
    ];
    vi.mocked(fetchBooks).mockResolvedValue(mockDocs);

    const result = await getBooks('google');

    expect(fetchBooks).toHaveBeenCalledTimes(1);
    expect(fetchBooks).toHaveBeenCalledWith('google');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: 'How Google Works',
      author: 'Eric Schmidt, Jonathan Rosenberg',
    });
  });
});
