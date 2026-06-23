import { Suspense, type ReactNode } from 'react';
import HomePage from '@/views/home/ui/HomePage';

export default function MainLayout({ children }: { children?: ReactNode }) {
  return (
    <Suspense>
      <HomePage>{children}</HomePage>
    </Suspense>
  );
}
