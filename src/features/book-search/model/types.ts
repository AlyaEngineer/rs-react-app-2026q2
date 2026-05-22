import type { Book } from '@/entities/book/model/types';

export interface GetBooksResult {
  books: Book[];
  totalBooks: number;
}
