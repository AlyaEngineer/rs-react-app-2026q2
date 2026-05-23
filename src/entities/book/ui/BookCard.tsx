import { Link } from '@tanstack/react-router';
import { type Book } from '@/entities/book/model/types';
import { getCoverUrl } from '@/entities/book/model/getCoverUrl';
import { Route as BookDetailsRoute } from '@/routes/_layout.book.$detailsId';
import { Route as HomeRoute } from '@/routes/_layout';
import { Checkbox } from './Checkbox';
import { useBookSelection } from '@/shared/lib/hooks/useBookSelection';

function BookCard({ book }: { book: Book }) {
  const { title, author, year } = book;
  const { page } = HomeRoute.useSearch();
  const { toggleSelection, isSelected } = useBookSelection(book);

  const coverUrl = getCoverUrl(book.coverId);
  const detailsId = book.id.replace('/works/', '');

  return (
    <Link
      to={BookDetailsRoute.to}
      params={{ detailsId }}
      search={{
        page,
        authorKeys: book.authorKeys?.join(','),
        coverId: book.coverId,
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      resetScroll={false}
      aria-label={`View book card for ${title}`}
    >
      <div
        className="group border-border hover:border-primary/50 hover:shadow-primary/10 bg-card flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-xl"
        data-testid="book-card"
      >
        <div className="bg-muted relative flex h-64 w-full items-center justify-center overflow-hidden px-4">
          <img
            src={coverUrl}
            alt={title}
            className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="border-border/50 relative flex grow flex-col justify-between border-t p-4">
          <Checkbox
            isSelected={isSelected}
            onChange={toggleSelection}
            className="text-secondary-foreground/80 hover:text-secondary-foreground absolute right-3 bottom-3 z-10 flex h-6 w-6 items-center justify-center backdrop-blur-none transition-all duration-300 hover:cursor-default"
          />

          <div className="space-y-1">
            <h3 className="group-hover:text-primary line-clamp-2 text-lg font-bold transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm font-semibold">
              Author: {author}
            </p>
          </div>

          <div className="text-muted-foreground mt-4 text-sm font-medium">
            {year ? (
              <p>First published: {year}</p>
            ) : (
              <p className="text-muted-foreground">
                First published:{' '}
                <span className="text-muted-foreground/50">N/A</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
