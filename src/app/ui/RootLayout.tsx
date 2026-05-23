import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import ErrorBoundary from './ErrorBoundary';
import ErrorFallback from './ErrorFallback';
import { Header } from '@/widgets/header/ui/Header';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export function RootLayout() {
  return (
    <ThemeProvider>
      <>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Header />
          <Outlet />
        </ErrorBoundary>

        <TanStackRouterDevtools />
      </>
    </ThemeProvider>
  );
}
