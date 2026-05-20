import { Link } from '@tanstack/react-router';
import { type Book } from '@/entities/book/model/types';
import { getCoverUrl } from '@/entities/book/model/getCoverUrl';

interface Props {
  book: Book;
}

function BookCard({ book }: Props) {
  const { title, author, year } = book;

  const coverUrl = getCoverUrl(book);
  const detailsId = book.id.replace('/works/', '');

  return (
    <Link
      to="/$detailsId"
      params={{ detailsId }}
      search={{
        authorKeys: book.authorKeys?.join(','),
        coverId: book.coverId,
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="group border-border hover:border-primary/50 hover:shadow-primary/10 bg-card flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-xl">
        <div className="bg-muted relative flex h-64 w-full items-center justify-center overflow-hidden px-4">
          <img
            src={coverUrl}
            alt={title}
            className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="border-border/50 flex grow flex-col justify-between border-t p-4">
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
