import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  addSelectedBook,
  removeSelectedBook,
} from '@/app/store/bookCardSlice/bookCardSlice';
import { type Book } from '@/entities/book/model/types';
import { selectSelectedBooks } from '@/app/store/bookCardSlice/bookCardSlice.selectors';

export function useBookSelection(book: Book) {
  const dispatch = useAppDispatch();
  const selectedBooks = useAppSelector(selectSelectedBooks);
  const isSelected = selectedBooks.some((b) => b.id === book.id);

  const toggleSelection = () => {
    dispatch(isSelected ? removeSelectedBook(book.id) : addSelectedBook(book));
  };

  return { isSelected, toggleSelection };
}
