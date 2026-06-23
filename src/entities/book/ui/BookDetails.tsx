import Image from 'next/image';
import { getCoverUrl } from '@/entities/book/model/getCoverUrl';
import { type BookDetails } from '@/entities/book/model/types';
import { AuthorList } from '@/entities/book/ui/AuthorList';
import { SubjectList } from '@/entities/book/ui/SubjectList';
import { useTranslations } from 'next-intl';

export function BookDetails({ book }: { book: BookDetails }) {
  const { title, coverId, authors, description, subjects } = book;
  const coverUrl = getCoverUrl(coverId, 'L');
  const t = useTranslations('bookDetailsPanel');

  return (
    <div className="space-y-6" data-testid="book-details">
      <Image
        src={coverUrl}
        alt={title}
        width={400}
        height={600}
        unoptimized
        className="mx-auto h-auto max-h-150 w-full max-w-xs rounded-lg object-contain shadow-md"
      />

      <h2 className="text-foreground text-2xl font-bold">{title}</h2>

      <AuthorList authors={authors} />

      {description && (
        <div>
          <h3 className="text-foreground mb-2 font-semibold">
            {t('description')}
          </h3>
          <p className="text-muted-foreground leading-7">{description}</p>
        </div>
      )}

      <SubjectList subjects={subjects} />
    </div>
  );
}
