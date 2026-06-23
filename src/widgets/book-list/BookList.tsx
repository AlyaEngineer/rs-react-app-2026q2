import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { type Book } from '@/entities/book/model/types';
import BookCard from '@/entities/book/ui/BookCard';
import { parsePage } from '@/features/pagination/model/parsePage';

interface Props {
  items: Book[];
}

export default function BookList({ items }: Props) {
  const searchParams = useSearchParams();
  const page = parsePage(searchParams.get('page'));

  const buildHref = (book: Book): string => {
    const detailsId = book.id.replace('/works/', '');
    const params = new URLSearchParams({ page: String(page) });

    const authorKeys = book.authorKeys?.join(',');
    if (authorKeys) params.set('authorKeys', authorKeys);
    if (book.coverId != null) params.set('coverId', String(book.coverId));

    return `/book/${detailsId}?${params.toString()}`;
  };

  return (
    <ul className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((book) => (
        <li key={book.id}>
          <Link
            href={buildHref(book)}
            scroll={false}
            aria-label={`View book card for ${book.title}`}
            className="block h-full"
          >
            <BookCard book={book} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
