'use client';

import { useCallback, useEffect, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import Search from '@/features/book-search/ui/Search';
import BookList from '@/widgets/book-list/BookList';
import ErrorTestButton from '@/shared/errors/ErrorTestButton';
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage';
import { Pagination } from '@/features/pagination/ui/Pagination';
import { useBookListQuery } from '@/features/book-search/api/searchApi';
import { useAppDispatch } from '@/shared/store/hooks';
import { openLibraryApi } from '@/shared/api/openLibraryApi';
import { parsePage } from '@/features/pagination/model/parsePage';

export default function HomePage({ children }: { children?: ReactNode }) {
  const t = useTranslations('home');
  const [searchTerm, setSearchTerm] = useLocalStorage('search_query', '');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parsePage(searchParams.get('page'));
  const dispatch = useAppDispatch();

  const { data, isFetching, isError, error } = useBookListQuery({
    term: searchTerm || 'all',
    page,
  });

  const errorMessage =
    error && 'status' in error
      ? `Error ${String(error.status)}`
      : t('unknownError');

  const books = data?.books ?? [];
  const totalBooks = data?.totalBooks ?? 0;

  const isDetailOpen = pathname.includes('/book/');

  const closeDetail = useCallback(() => {
    router.push(`/?page=${String(page)}`, { scroll: false });
  }, [router, page]);

  useEffect(() => {
    if (!isDetailOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetail();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDetailOpen, closeDetail]);

  return (
    <div className="from-primary/10 via-secondary/30 to-accent/20 text-foreground flex min-h-screen flex-col bg-linear-to-br pt-12">
      <div className="mx-auto mb-12 w-full max-w-7xl space-y-8 px-6">
        <header className="text-center">
          <h1 className="text-foreground mb-8 text-5xl font-bold">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            <span>{t('subtitleFirst')}</span>
            <span className="block">{t('subtitleSecond')}</span>
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
              <p className="font-medium">{t('errorTitle')}</p>
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
                  {t('empty')}
                </p>
              </div>
            ))}
        </div>

        {isDetailOpen && (
          <>
            <div
              className="bg-popover-foreground/50 fixed inset-0 z-40 cursor-pointer backdrop-blur-sm"
              onClick={closeDetail}
            />

            <section className="bg-card border-border fixed top-0 right-0 z-50 h-full w-full max-w-lg overflow-y-auto border-l p-6 shadow-xl">
              {children}
            </section>
          </>
        )}
      </section>
    </div>
  );
}
