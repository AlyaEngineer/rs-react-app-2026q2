import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ttl = Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 60;

export const openLibraryApi = createApi({
  reducerPath: 'openLibraryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: OPEN_LIBRARY_BASE_URL,
  }),
  keepUnusedDataFor: ttl,
  tagTypes: ['Books', 'BookDetails'],
  endpoints: () => ({}),
});
