import { useNavigate } from '@tanstack/react-router';
import { X as CloseIcon } from 'lucide-react';
import { Route as HomeRoute } from '@/routes/_layout';

export function BookDetailsCloseButton() {
  const navigate = useNavigate();
  const { page } = HomeRoute.useSearch();

  const onClose = () => {
    void navigate({
      to: '/',
      resetScroll: false,
      search: { page },
    });
  };

  return (
    <button
      onClick={onClose}
      aria-label="Close book details"
      data-testid="book-details-close-button"
      className="text-muted-foreground hover:text-foreground flex h-10 w-10 items-center justify-center transition-colors hover:cursor-pointer"
    >
      <CloseIcon aria-hidden="true" />
    </button>
  );
}
