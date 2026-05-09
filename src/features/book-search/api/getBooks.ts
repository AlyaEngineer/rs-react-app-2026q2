import { fetchBooks } from '../../../shared/api/client';
import { mapBook } from '../../../entities/book/model/mapBook';
import { filterBooks } from '../model/filterBooks';
import type { Book } from '../../../entities/book/model/types';

export const getBooks = async (term: string): Promise<Book[]> => {
  const docs = await fetchBooks(term || 'all');

  const books = docs.map(mapBook);

  return filterBooks(books, term);
};
