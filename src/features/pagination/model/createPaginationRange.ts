import { PAGES_AROUND_CURRENT } from './constants';

export type PaginationItem = number | 'dots';

interface PaginationParams {
  currentPage: number;
  totalPages: number;
}

export const createPaginationRange = ({
  currentPage,
  totalPages,
}: PaginationParams): PaginationItem[] => {
  const pages: PaginationItem[] = [];

  const delta = PAGES_AROUND_CURRENT;

  const left = Math.max(1, currentPage - delta);
  const right = Math.min(totalPages, currentPage + delta);

  if (left > 1) pages.push(1);
  if (left > 2) pages.push('dots');

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) pages.push('dots');
  if (right < totalPages) pages.push(totalPages);

  return pages;
};
