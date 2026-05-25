import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
  createRootRoute,
} from '@tanstack/react-router';
import { NotFoundPage } from '@/pages/notFound/ui/NotFoundPage';

async function renderNotFoundPage() {
  const router = createRouter({
    routeTree: createRootRoute({ component: NotFoundPage }),
    history: createMemoryHistory({ initialEntries: ['/not-found'] }),
  });
  await router.load();
  render(<RouterProvider router={router} />);
}

describe('NotFoundPage', () => {
  it('should render 404 heading', async () => {
    await renderNotFoundPage();
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('should render Page Not Found heading', async () => {
    await renderNotFoundPage();
    expect(
      screen.getByRole('heading', { name: 'Page Not Found' })
    ).toBeInTheDocument();
  });

  it('should render link to home page', async () => {
    await renderNotFoundPage();
    expect(
      screen.getByRole('link', { name: 'Return to Home Page' })
    ).toBeInTheDocument();
  });
});
