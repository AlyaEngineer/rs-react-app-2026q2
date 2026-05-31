import { RefreshCw as RefreshCwIcon } from 'lucide-react';

interface Props {
  onRefresh: () => void;
}

export function RefreshButton({ onRefresh }: Props) {
  return (
    <button
      type="button"
      onClick={onRefresh}
      className="bg-secondary text-secondary-foreground flex cursor-pointer items-center gap-2 rounded-lg px-6 py-2 text-lg transition-opacity hover:opacity-90 active:scale-95"
      aria-label="Refresh data"
      data-testid="refresh-button"
    >
      <RefreshCwIcon className="h-5 w-5" />
      Refresh
    </button>
  );
}
