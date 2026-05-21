import { createFileRoute } from '@tanstack/react-router';
import { getBookDetails } from '@/entities/book/api/getBookDetails';
import { Loader2 } from 'lucide-react';
import { BookDetailsError } from '@/pages/bookDetails/ui/BookDetailsError';
import { BookDetailsPanel } from '@/pages/bookDetails/ui/BookDetailsPanel';

export const Route = createFileRoute('/_layout/$detailsId')({
  validateSearch: (search: Record<string, unknown>) => ({
    authorKeys:
      typeof search.authorKeys === 'string' ? search.authorKeys : undefined,
  }),
  loaderDeps: ({ search }) => ({
    authorKeys: search.authorKeys,
  }),
  loader: ({ params, deps }) =>
    getBookDetails(params.detailsId, deps.authorKeys?.split(',')),
  pendingComponent: () => (
    <div className="flex flex-col items-center gap-4 pt-12">
      <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      <p className="text-muted-foreground text-sm">Loading book details...</p>
    </div>
  ),
  errorComponent: BookDetailsError,
  component: function BookDetailsPanelRoute() {
    const book = Route.useLoaderData();
    const { detailsId } = Route.useParams();
    return <BookDetailsPanel book={book} detailsId={detailsId} />;
  },
});
