import { Loader2 as LoaderIcon } from 'lucide-react';

export function BookDetailsLoader() {
  return (
    <div className="flex flex-col items-center gap-4 pt-12" role="status">
      <LoaderIcon
        className="text-muted-foreground h-8 w-8 animate-spin"
        aria-hidden="true"
      />
      <p className="text-muted-foreground text-sm">Loading book details...</p>
    </div>
  );
}
