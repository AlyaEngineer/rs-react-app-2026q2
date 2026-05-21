import HomePage from '@/pages/home/ui/HomePage';
import { createFileRoute } from '@tanstack/react-router';

interface BookSearch {
  page: number;
}

export const Route = createFileRoute('/_layout')({
  validateSearch: (search: Record<string, unknown>): BookSearch => {
    const page = Number(search.page);

    return {
      page: Number.isFinite(page) && page > 0 ? page : 1,
    };
  },

  component: () => <HomePage />,
});
