import { getAuthorPhotoUrl } from '@/entities/book/model/getAuthorPhotoUrl';
import { getCoverUrl } from '@/entities/book/model/getCoverUrl';
import { type BookDetails } from '@/entities/book/model/types';
import { User } from 'lucide-react';

interface BookDetailsProps {
  book: BookDetails;
}

export function BookDetails({ book }: BookDetailsProps) {
  const coverUrl = getCoverUrl(book, 'L');

  return (
    <div className="space-y-6">
      {coverUrl && (
        <img
          src={coverUrl}
          alt={book.title}
          className="mx-auto h-auto max-h-150 w-auto rounded-lg object-cover shadow-md"
        />
      )}

      <h2 className="text-foreground text-2xl font-bold">{book.title}</h2>

      {book.authors.length > 0 ? (
        <div className="bg-muted space-y-3 rounded-lg p-4">
          {book.authors.map((author, i) => (
            <div key={i} className="flex items-center gap-4">
              {author.photoId ? (
                <img
                  src={getAuthorPhotoUrl(author.photoId)}
                  alt={author.name}
                  className="h-16 w-16 shrink-0 rounded-full object-cover shadow-inner"
                />
              ) : (
                <div className="bg-secondary text-secondary-foreground flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-inner">
                  <User className="h-7 w-7 opacity-60" />
                </div>
              )}
              <div className="flex flex-col justify-center">
                <p className="text-foreground font-semibold">{author.name}</p>
                <p className="text-muted-foreground text-sm">
                  {author.isContributor ? (
                    'Contributor'
                  ) : (
                    <>
                      Born:{' '}
                      {author.birthDate ?? (
                        <span className="opacity-50">N/A</span>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted flex items-center gap-4 rounded-lg p-4">
          <div className="bg-secondary text-secondary-foreground flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-inner">
            <User className="h-7 w-7 opacity-60" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-foreground font-semibold">Unknown Author</p>
            <p className="text-muted-foreground text-sm">
              Born: <span className="opacity-50">N/A</span>
            </p>
          </div>
        </div>
      )}

      {book.description && (
        <div>
          <h3 className="text-foreground mb-2 font-semibold">Description</h3>
          <p className="text-muted-foreground leading-7">{book.description}</p>
        </div>
      )}

      {book.subjects && book.subjects.length > 0 && (
        <div>
          <h3 className="text-foreground mb-2 font-semibold">Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {book.subjects.map((subject) => (
              <span
                key={subject}
                className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
