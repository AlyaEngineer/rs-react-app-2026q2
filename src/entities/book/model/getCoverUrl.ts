import { type CoverKey, COVER_SOURCES } from '../../../shared/config/covers';
import {
  COVER_BASE_URL,
  PLACEHOLDER_COVER,
} from '../../../shared/config/images';
import type { Book } from './types';

export type CoverSize = 'S' | 'M' | 'L';

export const DEFAULT_COVER_SIZE: CoverSize = 'M';

export const getCoverUrl = (
  book: Book,
  size: CoverSize = DEFAULT_COVER_SIZE
): string => {
  const values: Record<CoverKey, string | number | undefined> = {
    id: book.coverId,
    isbn: book.isbn,
    olid: book.olid,
    oclc: book.oclc,
    lccn: book.lccn,
  };

  for (const key of COVER_SOURCES) {
    const value = values[key];

    if (value) {
      return `${COVER_BASE_URL}/${key}/${String(value)}-${size}.jpg`;
    }
  }

  return PLACEHOLDER_COVER;
};
