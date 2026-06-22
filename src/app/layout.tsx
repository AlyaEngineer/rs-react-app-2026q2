import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from '@/shared/providers/Providers';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Discover Your Next Lovely Book',
  description: 'Search millions of books in the Open Library',
};

const themeScript = `
(function() {
  try {
    const t = localStorage.getItem('theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
