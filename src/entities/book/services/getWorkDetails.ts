import type { BookDetails, WorkApiResponse } from '../model/types';

import {
  apiUrl,
  extractText,
  pickCoverId,
  resolveAuthorKeys,
} from '@/entities/book/api/helpers';
import { fetchAllAuthors } from '@/entities/book/api/fetchAllAuthors';

interface Args {
  id: string;
  authorKeys?: string[];
  fallbackCoverId?: number;
}

export async function getWorkDetails({
  id,
  authorKeys,
  fallbackCoverId,
}: Args): Promise<BookDetails> {
  const res = await fetch(apiUrl('works', id));

  if (!res.ok) {
    throw new Error('Failed to fetch work details');
  }

  const work = (await res.json()) as WorkApiResponse;

  const keys = resolveAuthorKeys(
    authorKeys,
    work.authors?.map((a) => a.author.key) ?? []
  );

  return {
    title: work.title,
    description: extractText(work.description),
    subjects: work.subjects?.slice(0, 5),
    coverId: pickCoverId(work.covers, fallbackCoverId),
    authors: await fetchAllAuthors(keys),
  };
}
