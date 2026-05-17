import { Link } from '@tanstack/react-router';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-20 text-center">
      <h1 className="text-primary animate-bounce text-9xl font-extrabold">
        404
      </h1>

      <h2 className="text-foreground mt-4 mb-2 text-3xl font-bold">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md text-balance">
        The page you are looking for does not exist, has been removed, or is
        temporarily unavailable.
      </p>

      <Link
        to="/"
        className="bg-primary text-primary-foreground cursor-pointer rounded-lg px-6 py-2 text-lg transition-opacity duration-200 hover:opacity-90 active:scale-95"
      >
        Return to Home Page
      </Link>
    </div>
  );
}
