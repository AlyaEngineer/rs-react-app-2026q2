import { Component } from 'react';
import { type Book } from '../../entities/book/model/types';
import BookCard from '../../entities/book/ui/BookCard';

interface Props {
  items: Book[];
}

class BookList extends Component<Props> {
  render() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {this.props.items.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  }
}

export default BookList;
