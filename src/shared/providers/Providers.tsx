'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/shared/store/store';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import { Header } from '@/widgets/header/ui/Header';
import { Flyout } from '@/features/flyout/ui/Flyout';
import ErrorBoundary from '@/shared/errors/ErrorBoundary';
import ErrorFallback from '@/shared/errors/ErrorFallback';

export function Providers({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Header />
          {children}
          <Flyout />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
