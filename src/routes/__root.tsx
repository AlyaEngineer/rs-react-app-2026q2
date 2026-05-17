import { createRootRoute } from '@tanstack/react-router';
import { NotFoundPage } from '@/pages/notFound/ui/NotFoundPage';
import { RootLayout } from '@/app/ui/RootLayout';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
