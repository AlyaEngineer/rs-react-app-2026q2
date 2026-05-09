import { RefreshCw } from 'lucide-react';

function ErrorFallback() {
  return (
    <div className="max-w-xl m-auto my-12 p-16 bg-destructive/10 text-destructive/70 border border-destructive/20 rounded-xl text-center shadow-sm">
      <h1 className="text-3xl font-bold mb-2">Something went wrong!</h1>

      <p className="font-medium text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        Try refreshing the page or coming back later.
      </p>

      <button
        className="inline-flex items-center justify-center px-6 py-3 gap-4 cursor-pointer rounded-xl font-semibold bg-destructive text-destructive-foreground transition-all duration-300 hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/20 active:scale-98"
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
