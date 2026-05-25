import { Link } from '@tanstack/react-router';
import { type Book } from '@/entities/book/model/types';
import BookCard from '@/entities/book/ui/BookCard';
import { Route as BookDetailsRoute } from '@/routes/_layout.book.$detailsId';
import { Route as HomeRoute } from '@/routes/_layout';

interface Props {
  items: Book[];
}

export default function BookList({ items }: Props) {
  const { page } = HomeRoute.useSearch();

  return (
    <ul className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((book) => {
        const detailsId = book.id.replace('/works/', '');

        return (
          <li key={book.id}>
            <Link
              to={BookDetailsRoute.to}
              params={{ detailsId }}
              search={{
                page,
                authorKeys: book.authorKeys?.join(','),
                coverId: book.coverId,
              }}
              resetScroll={false}
              aria-label={`View book card for ${book.title}`}
              className="block h-full"
            >
              <BookCard book={book} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
