import { Component } from 'react';
import { type Book } from '../../entities/book/model/types';
import BookCard from '../../entities/book/ui/BookCard';

interface Props {
  items: Book[];
}

class BookList extends Component<Props> {
  render() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {this.props.items.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  }
}

export default BookList;
