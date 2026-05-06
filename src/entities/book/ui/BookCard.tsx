import { Component } from 'react';
import { type Book } from '../model/types';
import { getCoverUrl } from '../model/getCoverUrl';

interface Props {
  book: Book;
}

class BookCard extends Component<Props> {
  render() {
    const { title, author, year } = this.props.book;

    const coverUrl = getCoverUrl(this.props.book);
    console.log(
      'COVER URL:',
      coverUrl,
      this.props.book.title,
      this.props.book.isbn,
      this.props.book.olid,
      this.props.book.coverId,
      this.props.book.lccn,
      this.props.book.oclc,
      this.props.book.id
    );

    return (
      <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:cursor-pointer transition-all">
        <div className="h-80 overflow-hidden bg-muted">
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-4 flex flex-col grow justify-between">
          <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-primary font-medium mb-2">{author}</p>

          <div className="text-sm text-muted-foreground space-y-1 mb-3 font-medium">
            {year ? (
              <p>First published: {year}</p>
            ) : (
              <p className="text-muted-foreground">First published: -</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
