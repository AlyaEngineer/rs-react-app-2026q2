import { openLibraryApi } from '@/shared/api/openLibraryApi';
import { mapBook } from '@/entities/book/model/mapBook';
import type { GetBooksResult } from '@/features/book-search/model/types';
import type { OpenLibraryResponse } from '@/shared/api/types';

export const searchApi = openLibraryApi.injectEndpoints({
  endpoints: (build) => ({
    bookList: build.query<GetBooksResult, { term: string; page: number }>({
      query: ({ term, page }) => ({
        url: '/search.json',
        params: {
          q: term,
          limit: 20,
          page,
        },
      }),
      transformResponse: (response: OpenLibraryResponse): GetBooksResult => ({
        books: response.docs.map(mapBook),
        totalBooks: response.numFound,
      }),
      providesTags: ['Books'],
    }),
  }),
});

export const { useBookListQuery } = searchApi;
