'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ThemeToggleButton } from '@/widgets/header/ui/ThemeToggleButton';
import LanguageToggle from '@/widgets/header/ui/LanguageToggle';

export const Header = () => {
  const t = useTranslations('header');

  return (
    <header className="bg-card/95 supports-backdrop-filter:bg-card/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-12">
        <div className="ml-auto flex items-center gap-8">
          <nav className="flex items-center gap-6 text-xl">
            <Link
              href={{
                pathname: '/',
                query: { page: 1 },
              }}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('about')}
            </Link>
          </nav>

          <LanguageToggle />

          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};
