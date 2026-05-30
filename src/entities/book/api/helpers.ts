import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

export function extractText(
  value?: string | { type: string; value: string }
): string | undefined {
  if (!value) return undefined;
  return typeof value === 'string' ? value : value.value;
}

export function pickCoverId(
  covers?: number[],
  fallback?: number
): number | undefined {
  return covers?.find((id) => id > 0) ?? fallback;
}

export function resolveAuthorKeys(
  authorKeys: string[] | undefined,
  fallback: string[]
): string[] {
  return authorKeys?.length ? authorKeys : fallback;
}

export function apiUrl(type: 'books' | 'works', id: string): string {
  return `${OPEN_LIBRARY_BASE_URL}/${type}/${id}.json`;
}

export function isEditionId(id: string): boolean {
  return id.endsWith('M');
}
