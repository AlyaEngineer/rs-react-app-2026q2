import { useEffect, useRef, useState } from 'react';
import Search from '@/features/book-search/ui/Search';
import BookList from '@/widgets/book-list/BookList';
import ErrorTestButton from '@/app/ui/ErrorTestButton';
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage';
import { type Book } from '@/entities/book/model/types';
import { getBooks } from '@/features/book-search/api/getBooks';
import { Outlet, useChildMatches, useNavigate } from '@tanstack/react-router';
import { Route as HomeRoute } from '@/routes/_layout';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useLocalStorage('search_query', '');
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastTermRef = useRef<string | null>(null);
  const hasResultsRef = useRef(false);
  const navigate = useNavigate();
  const { page } = HomeRoute.useSearch();

  console.log('current page:', page);

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm === lastTermRef.current && hasResultsRef.current) return;
      lastTermRef.current = searchTerm;
      hasResultsRef.current = false;

      setIsLoading(true);
      setError(null);
      setResults([]);

      try {
        const { books, totalBooks } = await getBooks(searchTerm, page);
        hasResultsRef.current = books.length > 0;
        setResults(books);
        console.log(totalBooks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchBooks();
  }, [searchTerm, page]);

  const handleSearch = (term: string) => {
    setSearchTerm(term.trim());
  };

  const childMatches = useChildMatches();
  const navigate = useNavigate();

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
          <Search initialValue={searchTerm} onSearch={handleSearch} />
        </section>

        <ErrorTestButton />
      </div>

      <section className="bg-background w-full grow p-12">
        <div className="text-muted-foreground mx-auto max-w-7xl">
          {isLoading && (
            <div className="flex justify-center p-12">
              <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2" />
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-xl border p-16 text-center">
              <p className="font-medium">Oooops! Error...</p>
              <p>{error}</p>
            </div>
          )}

          {!isLoading &&
            !error &&
            (results.length > 0 ? (
              <BookList items={results} />
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
