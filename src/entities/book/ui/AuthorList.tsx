import { type BookDetails } from '@/entities/book/model/types';
import { AuthorAvatar } from '@/entities/book/ui/AuthorAvatar';

export function AuthorList({ authors }: { authors: BookDetails['authors'] }) {
  return (
    <ul
      className="bg-muted space-y-3 rounded-lg p-4"
      aria-label="Authors list"
      data-testid="author-list"
    >
      {authors.length > 0 ? (
        authors.map(({ name, photoId, birthDate, isContributor }, i) => (
          <li key={i} className="flex items-center gap-4">
            <AuthorAvatar photoId={photoId} name={name} />
            <div className="flex flex-col justify-center">
              <p className="text-foreground font-semibold">{name}</p>
              <p className="text-muted-foreground text-sm">
                {isContributor ? (
                  'Contributor'
                ) : (
                  <>
                    Born: {birthDate ?? <span className="opacity-50">N/A</span>}
                  </>
                )}
              </p>
            </div>
          </li>
        ))
      ) : (
        <li className="flex items-center gap-4">
          <AuthorAvatar name="Unknown Author" />
          <div className="flex flex-col justify-center">
            <p className="text-foreground font-semibold">Unknown Author</p>
            <p className="text-muted-foreground text-sm">
              Born: <span className="opacity-50">N/A</span>
            </p>
          </div>
        </li>
      )}
    </ul>
  );
}
