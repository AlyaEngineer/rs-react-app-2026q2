import {
  AUTHOR_BASE_URL,
  DEFAULT_IMAGE_SIZE,
  type ImageSize,
} from '@/shared/config/covers';

export const getAuthorPhotoUrl = (
  photoId?: number,
  size: ImageSize = DEFAULT_IMAGE_SIZE
): string | undefined => {
  if (!photoId) return;

  return `${AUTHOR_BASE_URL}/id/${String(photoId)}-${size}.jpg`;
};
