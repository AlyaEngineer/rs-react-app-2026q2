import { BookDetails } from '@/entities/book/ui/BookDetails';
import { type BookDetails as BookDetailsType } from '@/entities/book/model/types';
import { BookDetailsCloseButton } from '@/views/bookDetails/ui/BookDetailsCloseButton';
import { RefreshButton } from '@/shared/ui/RefreshButton';
import { useAppDispatch } from '@/shared/store/hooks';
import { openLibraryApi } from '@/shared/api/openLibraryApi';

interface Props {
  book: BookDetailsType;
  id: string;
}

export function BookDetailsPanel({ book, id }: Props) {
  const dispatch = useAppDispatch();

  return (
    <aside
      className="relative p-6"
      aria-label="Book details"
      data-testid="book-details-overlay"
    >
      <div className="absolute top-0 right-6 left-6">
        <div className="flex items-center justify-between">
          <RefreshButton
            onRefresh={() =>
              dispatch(
                openLibraryApi.util.invalidateTags([
                  { type: 'BookDetails', id },
                ])
              )
            }
          />
          <BookDetailsCloseButton />
        </div>
      </div>

      <BookDetails book={book} />
    </aside>
  );
}
