'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { BookDetailsError } from '@/views/bookDetails/ui/BookDetailsError';
import { BookDetailsPanel } from '@/views/bookDetails/ui/BookDetailsPanel';
import { BookDetailsLoader } from '@/views/bookDetails/ui/BookDetailsLoader';
import { useBookDetailsQuery } from '@/entities/book/api/bookApi';

export default function BookDetailsRoute() {
  const params = useParams<{ detailsId: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const detailsId = params?.detailsId ?? '';
  const searchParams = useSearchParams();

  const authorKeys = searchParams.get('authorKeys') ?? undefined;
  const coverIdRaw = searchParams.get('coverId');
  const coverId = coverIdRaw ? Number(coverIdRaw) || undefined : undefined;

  const { data, isLoading, isError } = useBookDetailsQuery({
    id: detailsId,
    authorKeys: authorKeys?.split(','),
    fallbackCoverId: coverId,
  });

  if (isLoading) return <BookDetailsLoader />;
  if (isError || !data) return <BookDetailsError />;

  return <BookDetailsPanel book={data} id={detailsId} />;
}
