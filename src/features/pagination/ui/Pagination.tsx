import { Link } from '@tanstack/react-router';
import { calculateTotalPages } from '@/features/book-search/model/calculateTotalPages';
import { Route as HomeRoute } from '@/routes/_layout';
import { createPaginationRange } from '@/features/pagination/model/createPaginationRange';

export function Pagination({ totalBooks }: { totalBooks: number }) {
  const { page } = HomeRoute.useSearch();

  const totalPages = calculateTotalPages(totalBooks);

  if (totalPages <= 1) return null;

  const pages = createPaginationRange({
    currentPage: page,
    totalPages,
  });

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <div className="my-10 flex flex-wrap items-center justify-center gap-2">
      <Link
        to="/"
        search={(prev) => ({
          ...prev,
          page: Math.max(1, page - 1),
        })}
        aria-disabled={isFirstPage}
        className={`rounded-full border px-4 py-2 text-sm transition-all ${
          isFirstPage
            ? 'pointer-events-none opacity-40'
            : 'border-primary/30 hover:bg-primary hover:text-primary-foreground'
        }`}
      >
        Prev
      </Link>

      {pages.map((pageItem, index) =>
        pageItem === 'dots' ? (
          <span
            key={`dots-${String(index)}`}
            className="text-muted-foreground px-3 py-2"
          >
            ...
          </span>
        ) : (
          <Link
            key={pageItem}
            to="/"
            search={(prev) => ({
              ...prev,
              page: pageItem,
            })}
            className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
              pageItem === page
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-primary/30 hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            {pageItem}
          </Link>
        )
      )}

      <Link
        to="/"
        search={(prev) => ({
          ...prev,
          page: Math.min(totalPages, page + 1),
        })}
        aria-disabled={isLastPage}
        className={`rounded-full border px-4 py-2 text-sm transition-all ${
          isLastPage
            ? 'pointer-events-none opacity-40'
            : 'border-primary/30 hover:bg-primary hover:text-primary-foreground'
        }`}
      >
        Next
      </Link>
    </div>
  );
}
