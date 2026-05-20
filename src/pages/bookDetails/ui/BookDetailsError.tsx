import { useNavigate } from '@tanstack/react-router';
import { X, AlertCircle } from 'lucide-react';

export function BookDetailsError() {
  const navigate = useNavigate();

  return (
    <aside className="relative p-6">
      <button
        onClick={() => void navigate({ to: '/' })}
        aria-label="Close details"
        className="text-muted-foreground hover:text-foreground absolute top-4 right-4 text-xl transition-colors hover:cursor-pointer"
      >
        <X />
      </button>
      <div className="text-muted-foreground flex flex-col items-center gap-3 pt-12 text-center">
        <AlertCircle className="text-destructive h-10 w-10 opacity-70" />
        <p className="font-medium">Failed to load book details</p>
        <p className="text-sm opacity-70">Please try again later</p>
      </div>
    </aside>
  );
}
