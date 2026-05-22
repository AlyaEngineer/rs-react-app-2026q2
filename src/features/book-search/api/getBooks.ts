import { fetchBooks } from '@/shared/api/client';
import { mapBook } from '@/entities/book/model/mapBook';
import type { GetBooksResult } from '@/features/book-search/model/types';

export const getBooks = async (
  term: string,
  page: number
): Promise<GetBooksResult> => {
  const { docs, numFound } = await fetchBooks(term || 'all', page);

  const books = docs.map(mapBook);

  const totalBooks = numFound;

  return { books, totalBooks };
};
