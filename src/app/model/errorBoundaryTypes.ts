import type { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface ErrorTestButtonState {
  shouldThrow: boolean;
}
