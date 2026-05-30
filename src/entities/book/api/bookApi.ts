import { openLibraryApi } from '@/shared/api/openLibraryApi';
import type {
  BookDetails,
  WorkApiResponse,
  EditionApiResponse,
} from '../model/types';
import {
  extractText,
  pickCoverId,
  resolveAuthorKeys,
  apiUrl,
  isEditionId,
} from './helpers';

import { fetchAllAuthors } from './fetchAllAuthors';

export interface GetBookDetailsArg {
  id: string;
  authorKeys?: string[];
  fallbackCoverId?: number;
}

export const bookApi = openLibraryApi.injectEndpoints({
  endpoints: (build) => ({
    bookDetails: build.query<BookDetails, GetBookDetailsArg>({
      queryFn: async ({ id, authorKeys, fallbackCoverId }) => {
        try {
          if (!isEditionId(id)) {
            const res = await fetch(apiUrl('works', id));
            if (!res.ok) throw new Error('Failed to fetch work details');
            const work = (await res.json()) as WorkApiResponse;

            const keys = resolveAuthorKeys(
              authorKeys,
              work.authors?.map((a) => a.author.key) ?? []
            );

            return {
              data: {
                title: work.title,
                description: extractText(work.description),
                subjects: work.subjects?.slice(0, 5),
                coverId: pickCoverId(work.covers, fallbackCoverId),
                authors: await fetchAllAuthors(keys),
              },
            };
          }

          const editionRes = await fetch(apiUrl('books', id));
          if (!editionRes.ok)
            throw new Error('Failed to fetch edition details');
          const edition = (await editionRes.json()) as EditionApiResponse;

          if (edition.works?.[0]?.key) {
            const workId = edition.works[0].key.replace('/works/', '');
            const workRes = await fetch(apiUrl('works', workId));
            if (!workRes.ok) throw new Error('Failed to fetch work details');
            const work = (await workRes.json()) as WorkApiResponse;

            const keys = resolveAuthorKeys(
              authorKeys,
              edition.authors?.map((a) => a.key).length
                ? edition.authors.map((a) => a.key)
                : (work.authors?.map((a) => a.author.key) ?? [])
            );

            return {
              data: {
                title: work.title,
                description: extractText(work.description),
                subjects: (work.subjects ?? edition.subjects)?.slice(0, 5),
                coverId: pickCoverId(
                  work.covers ?? edition.covers,
                  fallbackCoverId
                ),
                authors: await fetchAllAuthors(keys),
              },
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
                ? [{ name: edition.by_statement, isContributor: true }]
                : [];

          return {
            data: {
              title: edition.title ?? 'Unknown Title',
              description: undefined,
              subjects: edition.subjects?.slice(0, 5),
              coverId: pickCoverId(edition.covers, fallbackCoverId),
              authors,
            },
          };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
    }),
  }),
});

export const { useBookDetailsQuery } = bookApi;
