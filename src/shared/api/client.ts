import type {
  OpenLibraryDoc,
  OpenLibraryError,
  OpenLibraryResponse,
} from '@/shared/api/types';
import { OPEN_LIBRARY_SEARCH_URL } from '@/shared/config/openLibraryApi';

export const fetchBooks = async (term: string): Promise<OpenLibraryDoc[]> => {
  const url = `${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(term)}&limit=20`;

  const response = await fetch(url);
  if (!response.ok) {
    let message: string;
    const status = response.status;

    try {
      const error = (await response.json()) as OpenLibraryError;
      const apiMessage = error.detail?.[0]?.msg;

      if (apiMessage) {
        message = response.statusText
          ? `${apiMessage} (${response.statusText})`
          : apiMessage;
      } else {
        if (status >= 500) {
          message = 'Server is temporarily unavailable';
        } else if (status >= 400) {
          message = 'Request cannot be completed. Please check your input.';
        } else {
          message = response.statusText || 'Unknown error';
        }
      }
    } catch {
      message = 'Invalid data format received from the server (HTML response)';
    }

    throw new Error(`Error ${String(status)}: ${message}`);
  }

  return ((await response.json()) as OpenLibraryResponse).docs;
};
