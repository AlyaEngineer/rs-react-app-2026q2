import { createFileRoute } from '@tanstack/react-router';
import { BookDetailsError } from '@/pages/bookDetails/ui/BookDetailsError';
import { BookDetailsPanel } from '@/pages/bookDetails/ui/BookDetailsPanel';
import { BookDetailsLoader } from '@/pages/bookDetails/ui/BookDetailsLoader';
import { useBookDetailsQuery } from '@/entities/book/api/bookApi';

export const Route = createFileRoute('/_layout/book/$detailsId')({
  validateSearch: (search: Record<string, unknown>) => ({
    authorKeys:
      typeof search.authorKeys === 'string' ? search.authorKeys : undefined,
    coverId:
      typeof search.coverId === 'number'
        ? search.coverId
        : Number(search.coverId) || undefined,
  }),

  component: function BookDetailsPanelRoute() {
    const { detailsId } = Route.useParams();
    const { authorKeys, coverId } = Route.useSearch();

    const { data, isLoading, isError } = useBookDetailsQuery({
      id: detailsId,
      authorKeys: authorKeys?.split(','),
      fallbackCoverId: coverId,
    });

    if (isLoading) return <BookDetailsLoader />;
    if (isError || !data) return <BookDetailsError />;

    return <BookDetailsPanel book={data} />;
  },
});
