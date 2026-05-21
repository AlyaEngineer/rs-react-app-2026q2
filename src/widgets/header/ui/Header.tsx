import { Link } from '@tanstack/react-router';

export const Header = () => {
  return (
    <header className="bg-card/95 supports-backdrop-filter:bg-card/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-12">
        <div className="ml-auto flex items-center gap-8">
          <nav className="flex items-center gap-6 text-xl">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
              activeProps={{ className: 'text-primary' }}
              activeOptions={{ exact: true, includeSearch: false }}
              search={{ page: 1 }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors"
              activeProps={{ className: 'text-primary' }}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
