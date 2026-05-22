import { BookDetails } from '@/entities/book/ui/BookDetails';
import { type BookDetails as BookDetailsType } from '@/entities/book/model/types';
import { BookDetailsCloseButton } from '@/pages/bookDetails/ui/BookDetailsCloseButton';

export function BookDetailsPanel({ book }: { book: BookDetailsType }) {
  return (
    <aside
      className="relative p-6"
      aria-label="Book details"
      data-testid="book-details-overlay"
    >
      <div className="absolute top-0 right-6">
        <BookDetailsCloseButton />
      </div>

      <BookDetails book={book} />
    </aside>
  );
}
