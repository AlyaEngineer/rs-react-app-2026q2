import { describe, it, expect } from 'vitest';
import {
  selectSelectedBooks,
  selectSelectedBooksCount,
} from '@/shared/store/bookCardSlice/bookCardSlice.selectors';
import type { RootState } from '@/shared/store/store';
import type { Book } from '@/entities/book/model/types';
import { openLibraryApi } from '@/shared/api/openLibraryApi';

const book: Book = {
  id: '/works/OL1W',
  title: 'Dune',
  author: 'Frank Herbert',
};

const makeState = (selectedBooks: Book[]): RootState => ({
  bookCards: { selectedBooks },
  openLibraryApi: openLibraryApi.reducer(undefined, { type: '' }),
});

describe('bookCardSlice selectors', () => {
  it('selectSelectedBooks should return selected books', () => {
    expect(selectSelectedBooks(makeState([book]))).toEqual([book]);
  });

  it('selectSelectedBooksCount should return count', () => {
    expect(selectSelectedBooksCount(makeState([book, book]))).toBe(2);
  });

  it('selectSelectedBooksCount should return 0 when empty', () => {
    expect(selectSelectedBooksCount(makeState([]))).toBe(0);
  });
});
