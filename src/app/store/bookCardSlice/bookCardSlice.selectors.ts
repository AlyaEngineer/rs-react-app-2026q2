import type { RootState } from '@/app/store/store';

export const selectSelectedBooks = (state: RootState) =>
  state.bookCards.selectedBooks;

export const selectSelectedBooksCount = (state: RootState) =>
  state.bookCards.selectedBooks.length;
