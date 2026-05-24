import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Book } from '@/entities/book/model/types';
import type { RootState } from '@/app/store/store';

export const selectSelectedBooks = (state: RootState) =>
  state.bookCard.selectedBookCard;

export const selectedBooksCount = (state: RootState) =>
  state.bookCard.selectedBookCard.length;

const initialState = {
  selectedBookCard: [] as Book[],
};

const bookCardSlice = createSlice({
  name: 'bookCard',
  initialState,
  reducers: {
    addSelectedBook(state, action: PayloadAction<Book>) {
      state.selectedBookCard.push(action.payload);
    },
    removeSelectedBook(state, action: PayloadAction<string>) {
      state.selectedBookCard = state.selectedBookCard.filter(
        (book) => book.id !== action.payload
      );
    },
    clearSelectedBooks(state) {
      state.selectedBookCard = [];
    },
  },
});

export const bookCardReducer = bookCardSlice.reducer;
export const { addSelectedBook, removeSelectedBook, clearSelectedBooks } =
  bookCardSlice.actions;
