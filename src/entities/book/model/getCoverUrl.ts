import { type ImageSize, DEFAULT_IMAGE_SIZE } from '@/shared/config/covers';
import { COVER_BASE_URL, PLACEHOLDER_COVER } from '@/shared/config/covers';

export const getCoverUrl = (
  coverId?: number,
  size: ImageSize = DEFAULT_IMAGE_SIZE
): string => {
  return coverId && coverId > 0
    ? `${COVER_BASE_URL}/id/${String(coverId)}-${size}.jpg`
    : PLACEHOLDER_COVER;
};
