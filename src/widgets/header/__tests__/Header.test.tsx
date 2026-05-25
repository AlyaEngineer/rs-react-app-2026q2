import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Header } from '@/widgets/header/ui/Header';

async function renderHeader(ui: React.ReactNode) {
  const router = createRouter({
    routeTree: createRootRoute({
      component: () => <>{ui}</>,
    }),
  });
  await router.load();
  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

describe('Header', () => {
  it('should render Home link', async () => {
    await renderHeader(<Header />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('should render About link', async () => {
    await renderHeader(<Header />);
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('should render theme toggle button', async () => {
    await renderHeader(<Header />);
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeInTheDocument();
  });
});
