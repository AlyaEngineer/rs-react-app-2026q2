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

    return (
      <div className="group flex flex-col h-full overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 rounded-xl shadow-sm hover:shadow-xl hover:shadow-primary/10 cursor-pointer bg-card">
        <div className="relative w-full h-64 flex items-center justify-center bg-muted px-4 overflow-hidden">
          <img
            src={coverUrl}
            alt={title}
            className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 flex flex-col grow justify-between border-t border-border/50">
          <div className="space-y-1">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm font-semibold text-muted-foreground">
              Author: {author}
            </p>
          </div>

          <div className="text-sm text-muted-foreground mt-4 font-medium">
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
    );
  }
}

export default BookCard;
