import { clearSelectedBooks } from '@/shared/store/bookCardSlice/bookCardSlice';
import {
  selectSelectedBooks,
  selectSelectedBooksCount,
} from '@/shared/store/bookCardSlice/bookCardSlice.selectors';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { downloadCsv } from '@/features/flyout/model/downloadCsv';

export function Flyout() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectSelectedBooksCount);
  const selectedBooks = useAppSelector(selectSelectedBooks);

  if (count === 0) return null;

  const handleDownload = () => {
    downloadCsv(selectedBooks);
  };

  return (
    <div
      className="bg-muted-foreground/70 border-border fixed bottom-0 left-0 z-50 flex w-full flex-wrap items-center justify-center border-t px-6 py-4 shadow-lg backdrop-blur"
      data-testid="flyout"
      role="region"
      aria-label="Selected books panel"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 sm:flex-row">
        <p className="text-primary-foreground font-medium whitespace-nowrap">
          Selected books: <span className="font-bold">{count}</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => dispatch(clearSelectedBooks())}
            className="border-secondary/80 text-primary-foreground hover:bg-secondary/10 cursor-pointer rounded-lg border px-4 py-2 text-sm whitespace-nowrap transition-all duration-300"
            aria-label="Unselect all books"
          >
            Unselect all
          </button>

          <button
            className="bg-accent/20 border-accent text-primary-foreground hover:bg-accent/30 cursor-pointer rounded-lg border px-4 py-2 text-sm whitespace-nowrap transition-all duration-300"
            aria-label="Download selected books as CSV"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
