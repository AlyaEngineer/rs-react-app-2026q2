import { RefreshCw } from 'lucide-react';

function ErrorFallback() {
  return (
    <div className="bg-destructive/10 text-destructive/70 border-destructive/20 m-auto my-12 max-w-xl rounded-xl border p-16 text-center shadow-sm">
      <h1 className="mb-2 text-3xl font-bold">Something went wrong!</h1>

      <p className="text-muted-foreground mx-auto mb-8 max-w-md text-lg font-medium">
        Try refreshing the page or coming back later.
      </p>

      <button
        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-destructive/20 inline-flex cursor-pointer items-center justify-center gap-4 rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:shadow-lg active:scale-98"
        onClick={() => {
          window.location.reload();
        }}
      >
        <RefreshCw />
        Reload page
      </button>
    </div>
  );
}

export default ErrorFallback;
