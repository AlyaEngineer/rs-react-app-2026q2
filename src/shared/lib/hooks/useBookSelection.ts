import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  addSelectedBook,
  removeSelectedBook,
} from '@/shared/store/bookCardSlice/bookCardSlice';
import { type Book } from '@/entities/book/model/types';
import { selectSelectedBooks } from '@/shared/store/bookCardSlice/bookCardSlice.selectors';

export function useBookSelection(book: Book) {
  const dispatch = useAppDispatch();
  const selectedBooks = useAppSelector(selectSelectedBooks);
  const isSelected = selectedBooks.some((b) => b.id === book.id);

  const toggleSelection = () => {
    dispatch(isSelected ? removeSelectedBook(book.id) : addSelectedBook(book));
  };

  return { isSelected, toggleSelection };
}
