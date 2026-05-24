import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import ErrorBoundary from './ErrorBoundary';
import ErrorFallback from './ErrorFallback';
import { Header } from '@/widgets/header/ui/Header';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import { Flyout } from '@/features/flyout/ui/Flyout';

export function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Header />
            <Outlet />
            <Flyout />
          </ErrorBoundary>

          <TanStackRouterDevtools />
        </>
      </ThemeProvider>
    </Provider>
  );
}
