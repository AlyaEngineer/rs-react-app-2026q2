import { describe, it, expect } from 'vitest';
import {
  bookCardsReducer,
  addSelectedBook,
  removeSelectedBook,
  clearSelectedBooks,
} from '@/shared/store/bookCardSlice/bookCardSlice';
import type { Book } from '@/entities/book/model/types';

const book1: Book = {
  id: '/works/OL1W',
  title: 'Dune',
  author: 'Frank Herbert',
};
const book2: Book = {
  id: '/works/OL2W',
  title: '1984',
  author: 'George Orwell',
};

describe('bookCardsSlice', () => {
  it('should return initial state', () => {
    expect(bookCardsReducer(undefined, { type: '@@INIT' })).toEqual({
      selectedBooks: [],
    });
  });

  it('should add a book', () => {
    const state = bookCardsReducer(undefined, addSelectedBook(book1));
    expect(state.selectedBooks).toContain(book1);
  });

  it('should remove a book by id', () => {
    const state = { selectedBooks: [book1, book2] };
    const result = bookCardsReducer(state, removeSelectedBook(book1.id));
    expect(result.selectedBooks).not.toContainEqual(book1);
    expect(result.selectedBooks).toContainEqual(book2);
  });

  it('should clear all books', () => {
    const state = { selectedBooks: [book1, book2] };
    const result = bookCardsReducer(state, clearSelectedBooks());
    expect(result.selectedBooks).toHaveLength(0);
  });
});
