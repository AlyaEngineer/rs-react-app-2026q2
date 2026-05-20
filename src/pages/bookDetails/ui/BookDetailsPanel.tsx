import { useNavigate } from '@tanstack/react-router';
import { BookDetails } from '@/entities/book/ui/BookDetails';
import { type BookDetails as BookDetailsType } from '@/entities/book/model/types';
import { X } from 'lucide-react';

interface BookDetailsProps {
  book: BookDetailsType;
  detailsId: string;
}

export function BookDetailsPanel({ book, detailsId }: BookDetailsProps) {
  const navigate = useNavigate();

  return (
    <aside key={detailsId} className="relative p-6">
      <button
        onClick={() =>
          void navigate({
            to: '/',
            resetScroll: false,
          })
        }
        aria-label="Close details"
        className="text-muted-foreground hover:text-foreground absolute right-0 flex h-10 w-10 items-center justify-center transition-colors hover:cursor-pointer"
      >
        <X />
      </button>
      <BookDetails book={book} />
    </aside>
  );
}
