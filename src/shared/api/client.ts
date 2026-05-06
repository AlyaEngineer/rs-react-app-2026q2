import type {
  OpenLibraryDoc,
  OpenLibraryError,
  OpenLibraryResponse,
} from './types';
import { OPEN_LIBRARY_BASE_URL } from '../config/api';

export const fetchBooks = async (term: string): Promise<OpenLibraryDoc[]> => {
  const url = `${OPEN_LIBRARY_BASE_URL}?q=${encodeURIComponent(term)}&limit=20`;

  const response = await fetch(url);

  const rawData: unknown = await response.json();

  if (!response.ok) {
    const error = rawData as OpenLibraryError;

    throw new Error(
      error.detail?.[0]?.msg ?? `Server error: ${String(response.status)}`
    );
  }

  return (rawData as OpenLibraryResponse).docs;
};
