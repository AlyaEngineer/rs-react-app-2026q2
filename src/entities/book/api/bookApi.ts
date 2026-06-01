import { openLibraryApi } from '@/shared/api/openLibraryApi';
import type { BookDetails } from '../model/types';

import { getBookDetails } from '@/entities/book/services/getBookDetails';

export interface GetBookDetailsArg {
  id: string;
  authorKeys?: string[];
  fallbackCoverId?: number;
}

export const bookApi = openLibraryApi.injectEndpoints({
  endpoints: (build) => ({
    bookDetails: build.query<BookDetails, GetBookDetailsArg>({
      queryFn: async (args) => {
        try {
          return {
            data: await getBookDetails(args),
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
      providesTags: (_result, _error, { id }) => [{ type: 'BookDetails', id }],
    }),
  }),
});

export const { useBookDetailsQuery } = bookApi;
