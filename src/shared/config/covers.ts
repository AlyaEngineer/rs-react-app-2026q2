export const COVERS_DOMAIN = 'https://covers.openlibrary.org';

export const COVER_BASE_URL = `${COVERS_DOMAIN}/b`;
export const AUTHOR_BASE_URL = `${COVERS_DOMAIN}/a`;

export const PLACEHOLDER_COVER =
  'https://placehold.co/600x400/f3f0ff/6b5b95/png?text=No+image+available';

export const ImageSize = {
  Small: 'S',
  Medium: 'M',
  Large: 'L',
} as const;

export type ImageSize = (typeof ImageSize)[keyof typeof ImageSize];

export const DEFAULT_IMAGE_SIZE = ImageSize.Medium;
