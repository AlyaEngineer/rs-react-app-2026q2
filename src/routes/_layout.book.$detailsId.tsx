import { createFileRoute } from '@tanstack/react-router';
import { getBookDetails } from '@/entities/book/api/getBookDetails';
import { BookDetailsError } from '@/pages/bookDetails/ui/BookDetailsError';
import { BookDetailsPanel } from '@/pages/bookDetails/ui/BookDetailsPanel';
import { BookDetailsLoader } from '@/pages/bookDetails/ui/BookDetailsLoader';

export const Route = createFileRoute('/_layout/book/$detailsId')({
  validateSearch: (search: Record<string, unknown>) => ({
    authorKeys:
      typeof search.authorKeys === 'string' ? search.authorKeys : undefined,
    coverId:
      typeof search.coverId === 'string'
        ? Number(search.coverId) || undefined
        : undefined,
  }),
  loaderDeps: ({ search }) => ({
    authorKeys: search.authorKeys,
    coverId: search.coverId,
  }),

  loader: ({ params, deps }) =>
    getBookDetails(params.detailsId, deps.authorKeys?.split(','), deps.coverId),

  pendingComponent: BookDetailsLoader,

  errorComponent: BookDetailsError,

  component: function BookDetailsPanelRoute() {
    const book = Route.useLoaderData();
    return <BookDetailsPanel book={book} />;
  },
});
