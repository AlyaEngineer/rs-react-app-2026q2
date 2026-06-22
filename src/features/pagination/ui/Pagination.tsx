'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { calculateTotalPages } from '@/features/book-search/model/calculateTotalPages';
import { createPaginationRange } from '@/features/pagination/model/createPaginationRange';
import { parsePage } from '@/features/pagination/model/parsePage';

export function Pagination({ totalBooks }: { totalBooks: number }) {
  const searchParams = useSearchParams();
  const page = parsePage(searchParams.get('page'));

  const totalPages = calculateTotalPages(totalBooks);

  if (totalPages <= 1) return null;

  const pages = createPaginationRange({
    currentPage: page,
    totalPages,
  });

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const hrefForPage = (p: number | string) => `/?page=${String(p)}`;

  return (
    <div className="my-10 flex flex-wrap items-center justify-center gap-2">
      <Link
        href={hrefForPage(Math.max(1, page - 1))}
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
            href={hrefForPage(pageItem)}
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
        href={hrefForPage(Math.min(totalPages, page + 1))}
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
