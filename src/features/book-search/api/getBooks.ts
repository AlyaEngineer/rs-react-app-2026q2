import { fetchBooks } from '@/shared/api/client';
import { mapBook } from '@/entities/book/model/mapBook';
import { filterBooks } from '@/features/book-search/model/filterBooks';
import type { GetBooksResult } from '@/features/book-search/model/types';

export const getBooks = async (term: string): Promise<GetBooksResult> => {
  const { docs, numFound } = await fetchBooks(term || 'all');

  const books = filterBooks(docs.map(mapBook), term);

  const totalBooks = numFound;

  return { books, totalBooks };
};
