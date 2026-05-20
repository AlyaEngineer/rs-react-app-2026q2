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
        onClick={() => void navigate({ to: '/' })}
        aria-label="Close details"
        className="text-muted-foreground hover:text-foreground absolute top-4 right-4 text-xl transition-colors hover:cursor-pointer"
      >
        <X />
      </button>
      <BookDetails book={book} />
    </aside>
  );
}
