import { describe, it, expect } from 'vitest';
import { mapBook } from '@/entities/book/model/mapBook';
import type { OpenLibraryDoc } from '@/shared/api/types';

describe('mapBook', () => {
  it('should correctly map all fields when full data is provided by API', () => {
    const mockFullDoc: OpenLibraryDoc = {
      key: '/works/OL468431W',
      title: 'The Great Gatsby',
      author_name: ['F. Scott Fitzgerald', 'Additional Editor'],
      first_publish_year: 1920,
      subject: ['Fiction', 'Classics', 'American Literature', 'Drama'],
      cover_i: 98765,
      edition_key: ['OL24217392M', 'OL24217393M'],
    };

    const result = mapBook(mockFullDoc);

    expect(result).toEqual({
      id: '/works/OL468431W',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald, Additional Editor',
      year: 1920,
      coverId: 98765,
    });
  });

  it('should handle missing optional fields and apply fallbacks', () => {
    const mockMinDoc: OpenLibraryDoc = {
      key: '/works/OL16646353M',
      title: 'The Holy Bible',
    };

    const result = mapBook(mockMinDoc);

    expect(result).toEqual({
      id: '/works/OL16646353M',
      title: 'The Holy Bible',
      author: 'Unknown Author',
      year: undefined,
      coverId: undefined,
    });
  });
});
