import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
  createRootRoute,
} from '@tanstack/react-router';
import { Pagination } from '@/features/pagination/ui/Pagination';
import { Route as HomeRoute } from '@/routes/_layout';

vi.mock('@/routes/_layout', () => ({
  Route: {
    useSearch: vi.fn(),
  },
}));

async function renderPagination(totalBooks: number, page = 1) {
  vi.mocked(HomeRoute.useSearch).mockReturnValue({ page });

  const router = createRouter({
    routeTree: createRootRoute({
      component: () => <Pagination totalBooks={totalBooks} />,
    }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  await router.load();

  return render(<RouterProvider router={router} />);
}

describe('Pagination', () => {
  it('should not render when only 1 page', async () => {
    const { container } = await renderPagination(20);
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render when no books', async () => {
    const { container } = await renderPagination(0);
    expect(container).toBeEmptyDOMElement();
  });

  it('should disable Prev on first page', async () => {
    await renderPagination(200, 1);
    expect(screen.getByRole('link', { name: 'Prev' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('should disable Next on last page', async () => {
    await renderPagination(40, 2);
    expect(screen.getByRole('link', { name: 'Next' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('should render dots when pages are far apart', async () => {
    await renderPagination(1000, 5);
    const dots = screen.getAllByText('...');
    expect(dots.length).toBeGreaterThan(0);
  });
});
