import { type BookDetails, type AuthorApiResponse } from '../model/types';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

export async function fetchAuthor(
  key: string
): Promise<BookDetails['authors'][number] | undefined> {
  try {
    const path = key.startsWith('/') ? key : `/authors/${key}`;
    const response = await fetch(`${OPEN_LIBRARY_BASE_URL}${path}.json`);

    if (!response.ok) return;

    const data = (await response.json()) as AuthorApiResponse;

    return {
      name: data.name,
      birthDate: data.birth_date,
      photoId: data.photos?.find((id) => id > 0),
    };
  } catch {
    return;
  }
}
