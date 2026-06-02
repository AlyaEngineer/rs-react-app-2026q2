import type {
  BookDetails,
  EditionApiResponse,
  WorkApiResponse,
} from '../model/types';

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

export async function getEditionDetails({
  id,
  authorKeys,
  fallbackCoverId,
}: Args): Promise<BookDetails> {
  const editionRes = await fetch(apiUrl('books', id));

  if (!editionRes.ok) {
    throw new Error('Failed to fetch edition details');
  }

  const edition = (await editionRes.json()) as EditionApiResponse;

  if (edition.works?.[0]?.key) {
    const workId = edition.works[0].key.replace('/works/', '');

    const workRes = await fetch(apiUrl('works', workId));

    if (!workRes.ok) {
      throw new Error('Failed to fetch work details');
    }

    const work = (await workRes.json()) as WorkApiResponse;

    const keys = resolveAuthorKeys(
      authorKeys,
      edition.authors?.length
        ? edition.authors.map((a) => a.key)
        : (work.authors?.map((a) => a.author.key) ?? [])
    );

    return {
      title: work.title,
      description: extractText(work.description),
      subjects: (work.subjects ?? edition.subjects)?.slice(0, 5),
      coverId: pickCoverId(work.covers ?? edition.covers, fallbackCoverId),
      authors: await fetchAllAuthors(keys),
    };
  }

  const keys = resolveAuthorKeys(
    authorKeys,
    edition.authors?.map((a) => a.key) ?? []
  );

  const authors =
    keys.length > 0
      ? await fetchAllAuthors(keys)
      : edition.by_statement
        ? [
            {
              name: edition.by_statement,
              isContributor: true,
            },
          ]
        : [];

  return {
    title: edition.title ?? 'Unknown Title',
    description: undefined,
    subjects: edition.subjects?.slice(0, 5),
    coverId: pickCoverId(edition.covers, fallbackCoverId),
    authors,
  };
}
