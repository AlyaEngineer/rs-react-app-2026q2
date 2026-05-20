import {
  type BookDetails,
  type EditionApiResponse,
  type WorkApiResponse,
} from '../model/types';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';
import { fetchAllAuthors } from './fetchAllAuthors';

function extractText(
  value?: string | { type: string; value: string }
): string | undefined {
  if (!value) return undefined;

  return typeof value === 'string' ? value : value.value;
}

function pickCoverId(covers?: number[], fallback?: number): number | undefined {
  return covers?.find((id) => id > 0) ?? fallback;
}

function resolveAuthorKeys(
  authorKeys: string[] | undefined,
  fallback: string[]
): string[] {
  return authorKeys?.length ? authorKeys : fallback;
}

function apiUrl(type: 'books' | 'works', id: string): string {
  return `${OPEN_LIBRARY_BASE_URL}/${type}/${id}.json`;
}

async function getEditionDetails(
  id: string,
  authorKeys?: string[],
  fallbackCoverId?: number
): Promise<BookDetails> {
  const res = await fetch(apiUrl('books', id));

  if (!res.ok) {
    throw new Error('Failed to fetch edition details');
  }

  const edition = (await res.json()) as EditionApiResponse;

  if (edition.works?.[0]?.key) {
    const workId = edition.works[0].key.replace('/works/', '');

    return getWorkDetails(workId, authorKeys, fallbackCoverId);
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

async function getWorkDetails(
  id: string,
  authorKeys?: string[],
  fallbackCoverId?: number
): Promise<BookDetails> {
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

export async function getBookDetails(
  id: string,
  authorKeys?: string[],
  fallbackCoverId?: number
): Promise<BookDetails> {
  return id.endsWith('M')
    ? getEditionDetails(id, authorKeys, fallbackCoverId)
    : getWorkDetails(id, authorKeys, fallbackCoverId);
}
