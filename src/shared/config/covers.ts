export const COVERS_DOMAIN = 'https://covers.openlibrary.org';

export const COVER_BASE_URL = `${COVERS_DOMAIN}/b`;
export const AUTHOR_BASE_URL = `${COVERS_DOMAIN}/a`;

export const PLACEHOLDER_COVER =
  'https://placehold.co/600x400/f3f0ff/6b5b95?text=No+image+available';

export type ImageSize = 'S' | 'M' | 'L';

export const DEFAULT_IMAGE_SIZE: ImageSize = 'M';

export type CoverKey = 'id' | 'isbn' | 'olid' | 'oclc' | 'lccn';

export const COVER_SOURCES: CoverKey[] = ['id', 'isbn', 'olid', 'oclc', 'lccn'];
