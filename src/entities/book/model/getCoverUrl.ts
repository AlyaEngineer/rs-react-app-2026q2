import {
  type CoverKey,
  type ImageSize,
  COVER_SOURCES,
  DEFAULT_IMAGE_SIZE,
} from '@/shared/config/covers';
import { COVER_BASE_URL, PLACEHOLDER_COVER } from '@/shared/config/covers';
import type { Book } from '@/entities/book/model/types';

type CoverData = Pick<Book, 'coverId' | 'isbn' | 'olid' | 'oclc' | 'lccn'>;

export const getCoverUrl = (
  book: Partial<CoverData>,
  size: ImageSize = DEFAULT_IMAGE_SIZE
): string => {
  const values: Record<CoverKey, string | number | undefined> = {
    id: book.coverId && book.coverId > 0 ? book.coverId : undefined,
    isbn: 'isbn' in book ? book.isbn : undefined,
    olid: 'olid' in book ? book.olid : undefined,
    oclc: 'oclc' in book ? book.oclc : undefined,
    lccn: 'lccn' in book ? book.lccn : undefined,
  };

  for (const key of COVER_SOURCES) {
    const value = values[key];

    if (value) {
      return `${COVER_BASE_URL}/${key}/${String(value)}-${size}.jpg`;
    }
  }

  return PLACEHOLDER_COVER;
};
