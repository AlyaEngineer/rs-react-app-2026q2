import { type Book } from '@/entities/book/model/types';
import BookCard from '@/entities/book/ui/BookCard';

interface Props {
  items: Book[];
}

export default function BookList({ items }: Props) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
