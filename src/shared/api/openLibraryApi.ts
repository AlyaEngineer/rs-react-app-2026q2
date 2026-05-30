import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const openLibraryApi = createApi({
  reducerPath: 'openLibraryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: OPEN_LIBRARY_BASE_URL,
  }),
  endpoints: () => ({}),
});
