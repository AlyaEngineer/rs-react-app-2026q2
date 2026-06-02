import { useEffect } from 'react';
import Search from '@/features/book-search/ui/Search';
import BookList from '@/widgets/book-list/BookList';
import ErrorTestButton from '@/app/ui/ErrorTestButton';
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage';
import { Outlet, useChildMatches, useNavigate } from '@tanstack/react-router';
import { Route as BookDetailsRoute } from '@/routes/_layout.book.$detailsId';
import { Route as HomeRoute } from '@/routes/_layout';
import { Pagination } from '@/features/pagination/ui/Pagination';
import { useBookListQuery } from '@/features/book-search/api/searchApi';
import { useAppDispatch } from '@/app/store/store';
import { openLibraryApi } from '@/shared/api/openLibraryApi';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useLocalStorage('search_query', '');
  const navigate = useNavigate();
  const { page } = HomeRoute.useSearch();
  const dispatch = useAppDispatch();

  const { data, isFetching, isError, error } = useBookListQuery({
    term: searchTerm || 'all',
    page,
  });

  const errorMessage =
    error && 'status' in error
      ? `Error ${String(error.status)}`
      : 'Something went wrong';

  const books = data?.books ?? [];
  const totalBooks = data?.totalBooks ?? 0;

  const childMatches = useChildMatches();

  const isDetailOpen = childMatches.some(
    (m) => m.routeId === BookDetailsRoute.id
  );

  useEffect(() => {
    if (!isDetailOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        void navigate({
          to: '/',
          search: { page },
          resetScroll: false,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDetailOpen, navigate, page]);

  return (
    <div className="from-primary/10 via-secondary/30 to-accent/20 text-foreground flex min-h-screen flex-col bg-linear-to-br pt-12">
      <div className="mx-auto mb-12 w-full max-w-7xl space-y-8 px-6">
        <header className="text-center">
          <h1 className="text-foreground mb-8 text-5xl font-bold">
            Discover Your Next Lovely Book
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            <span>Dive into millions of books in the open library</span>
            <span className="block">for every book ever published</span>
          </p>
        </header>

        <section className="bg-card border-border rounded-xl border p-6 shadow-sm">
          <Search
            initialValue={searchTerm}
            onSearch={setSearchTerm}
            onRefresh={() =>
              dispatch(openLibraryApi.util.invalidateTags(['Books']))
            }
          />
        </section>

        <ErrorTestButton />
      </div>

      <section className="bg-background w-full grow p-12">
        <div className="text-muted-foreground mx-auto max-w-7xl">
          {isFetching && (
            <div className="flex justify-center p-12">
              <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2" />
            </div>
          )}

          {isError && (
            <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-xl border p-16 text-center">
              <p className="font-medium">Oooops! Error...</p>
              <p>{errorMessage}</p>
            </div>
          )}

          {!isFetching &&
            !isError &&
            (books.length > 0 ? (
              <>
                <Pagination totalBooks={totalBooks} />
                <BookList items={books} />
                <Pagination totalBooks={totalBooks} />
              </>
            ) : (
              <div className="bg-accent/10 text-accent border-accent rounded-xl border p-16 text-center">
                <p className="text-muted-foreground text-center font-medium">
                  No books found. Try another search.
                </p>
              </div>
            ))}
        </div>

        {isDetailOpen && (
          <>
            <div
              className="bg-popover-foreground/50 fixed inset-0 z-40 cursor-pointer backdrop-blur-sm"
              onClick={() =>
                void navigate({
                  to: '/',
                  resetScroll: false,
                  search: { page },
                })
              }
            />

            <section className="bg-card border-border fixed top-0 right-0 z-50 h-full w-full max-w-lg overflow-y-auto border-l p-6 shadow-xl">
              <Outlet />
            </section>
          </>
        )}
      </section>
    </div>
  );
}
