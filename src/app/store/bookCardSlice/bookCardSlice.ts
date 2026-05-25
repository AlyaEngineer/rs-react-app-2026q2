import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Book } from '@/entities/book/model/types';

interface BookCardsState {
  selectedBooks: Book[];
}

const initialState: BookCardsState = {
  selectedBooks: [],
};

const bookCardsSlice = createSlice({
  name: 'bookCards',
  initialState,
  reducers: {
    addSelectedBook(state, action: PayloadAction<Book>) {
      state.selectedBooks.push(action.payload);
    },
    removeSelectedBook(state, action: PayloadAction<string>) {
      state.selectedBooks = state.selectedBooks.filter(
        (book) => book.id !== action.payload
      );
    },
    clearSelectedBooks(state) {
      state.selectedBooks = [];
    },
  },
});

export const bookCardsReducer = bookCardsSlice.reducer;
export const { addSelectedBook, removeSelectedBook, clearSelectedBooks } =
  bookCardsSlice.actions;
