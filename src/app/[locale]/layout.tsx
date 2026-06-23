import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Providers } from '@/shared/providers/Providers';
import { ThemeScript } from '@/shared/theme/ThemeInitializerScript';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Discover Your Next Lovely Book',
  description: 'Search millions of books in the Open Library',
};

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeScript />
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
