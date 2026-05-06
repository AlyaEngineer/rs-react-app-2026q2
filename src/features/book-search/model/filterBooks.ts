import { type Book } from '../../../entities/book/model/types';

export const filterBooks = (books: Book[], term: string): Book[] => {
  const words = term.toLowerCase().trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return books;

  return books.filter((book) => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();

    return words.every((word) => title.includes(word) || author.includes(word));
  });
};
