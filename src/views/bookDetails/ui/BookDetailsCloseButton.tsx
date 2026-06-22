'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { X as CloseIcon } from 'lucide-react';
import { parsePage } from '@/features/pagination/model/parsePage';

export function BookDetailsCloseButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parsePage(searchParams.get('page'));

  const onClose = () => {
    router.push(`/?page=${String(page)}`, { scroll: false });
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
