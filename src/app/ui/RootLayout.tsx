import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import ErrorBoundary from './ErrorBoundary';
import ErrorFallback from './ErrorFallback';
import { Header } from '@/widgets/header/ui/Header';

export function RootLayout() {
  return (
    <>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Header />
        <Outlet />
      </ErrorBoundary>

      <TanStackRouterDevtools />
    </>
  );
}
