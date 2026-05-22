import { BookDetailsCloseButton } from '@/pages/bookDetails/ui/BookDetailsCloseButton';
import { AlertCircle as AlertCircleIcon } from 'lucide-react';

export function BookDetailsError() {
  return (
    <aside
      className="relative p-6"
      aria-label="Book details error panel"
      data-testid="book-details-error"
    >
      <div className="absolute top-0 right-6">
        <BookDetailsCloseButton />
      </div>

      <div className="text-muted-foreground flex flex-col items-center gap-3 pt-12 text-center">
        <AlertCircleIcon
          className="text-destructive h-10 w-10 opacity-70"
          aria-hidden="true"
        />

        <p className="font-medium">Failed to load book details</p>
        <p className="text-sm opacity-70">Please try again later</p>
      </div>
    </aside>
  );
}
