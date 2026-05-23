import { getCoverUrl } from '@/entities/book/model/getCoverUrl';
import { type BookDetails } from '@/entities/book/model/types';
import { AuthorList } from '@/entities/book/ui/AuthorList';
import { SubjectList } from '@/entities/book/ui/SubjectList';

export function BookDetails({ book }: { book: BookDetails }) {
  const { title, coverId, authors, description, subjects } = book;
  const coverUrl = getCoverUrl(coverId, 'L');

  return (
    <div className="space-y-6" data-testid="book-details">
      <img
        src={coverUrl}
        alt={title}
        className="mx-auto h-auto max-h-150 w-auto rounded-lg object-cover shadow-md"
      />

      <h2 className="text-foreground text-2xl font-bold">{title}</h2>

      <AuthorList authors={authors} />

      {description && (
        <div>
          <h3 className="text-foreground mb-2 font-semibold">Description</h3>
          <p className="text-muted-foreground leading-7">{description}</p>
        </div>
      )}

      <SubjectList subjects={subjects} />
    </div>
  );
}
