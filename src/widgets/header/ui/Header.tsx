import Link from 'next/link';
import { ThemeToggleButton } from '@/widgets/header/ui/ThemeToggleButton';

export const Header = () => {
  return (
    <header className="bg-card/95 supports-backdrop-filter:bg-card/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-12">
        <div className="ml-auto flex items-center gap-8">
          <nav className="flex items-center gap-6 text-xl">
            <Link
              href="/?page=1"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>

          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};
