import { describe, it, expect } from 'vitest';
import {
  extractText,
  pickCoverId,
  resolveAuthorKeys,
  apiUrl,
  isEditionId,
} from '@/entities/book/api/helpers';

describe('extractText', () => {
  it('returns undefined when value is undefined', () => {
    expect(extractText(undefined)).toBeUndefined();
  });

  it('returns the string when value is a plain string', () => {
    expect(extractText('Some description')).toBe('Some description');
  });

  it('returns value.value when value is an object', () => {
    expect(extractText({ type: '/type/text', value: 'Rich text' })).toBe(
      'Rich text'
    );
  });
});

describe('pickCoverId', () => {
  it('returns first positive cover id', () => {
    expect(pickCoverId([0, -1, 42, 99])).toBe(42);
  });

  it('returns fallback when covers array is undefined', () => {
    expect(pickCoverId(undefined, 7)).toBe(7);
  });

  it('returns fallback when no positive cover id exists', () => {
    expect(pickCoverId([-1, 0], 5)).toBe(5);
  });

  it('returns undefined when covers is undefined and no fallback', () => {
    expect(pickCoverId(undefined)).toBeUndefined();
  });
});

describe('resolveAuthorKeys', () => {
  it('returns authorKeys when they are non-empty', () => {
    expect(resolveAuthorKeys(['/authors/OL1A'], ['/authors/OL2A'])).toEqual([
      '/authors/OL1A',
    ]);
  });

  it('returns fallback when authorKeys is undefined', () => {
    expect(resolveAuthorKeys(undefined, ['/authors/OL2A'])).toEqual([
      '/authors/OL2A',
    ]);
  });

  it('returns fallback when authorKeys is an empty array', () => {
    expect(resolveAuthorKeys([], ['/authors/OL2A'])).toEqual(['/authors/OL2A']);
  });

  it('returns empty array when both are empty', () => {
    expect(resolveAuthorKeys([], [])).toEqual([]);
  });
});

describe('apiUrl', () => {
  it('builds a works URL correctly', () => {
    const url = apiUrl('works', 'OL123W');
    expect(url).toMatch(/\/works\/OL123W\.json$/);
  });

  it('builds a books URL correctly', () => {
    const url = apiUrl('books', 'OL456M');
    expect(url).toMatch(/\/books\/OL456M\.json$/);
  });
});

describe('isEditionId', () => {
  it('returns true for IDs ending with M', () => {
    expect(isEditionId('OL123M')).toBe(true);
  });

  it('returns false for IDs not ending with M', () => {
    expect(isEditionId('OL123W')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isEditionId('')).toBe(false);
  });
});
