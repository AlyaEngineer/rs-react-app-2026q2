import { describe, it, expect } from 'vitest';
import { filterBooks } from '@/features/book-search/model/filterBooks';
import { type Book } from '@/entities/book/model/types';

const mockBooks: Book[] = [
  { id: '1', title: 'React Guide', author: 'Dan Abramov', editionCount: 1 },
  { id: '2', title: 'Vue Essentials', author: 'Evan You', editionCount: 2 },
];

describe('filterBooks function', () => {
  it('should return all books if search term is empty or contains only spaces', () => {
    expect(filterBooks(mockBooks, '')).toEqual(mockBooks);
    expect(filterBooks(mockBooks, '   ')).toEqual(mockBooks);
  });

  it('should filter by title case-insensitively', () => {
    const result = filterBooks(mockBooks, 'react');
    expect(result).toEqual([mockBooks[0]]);
  });

  it('should filter by author', () => {
    const result = filterBooks(mockBooks, 'Evan');
    expect(result).toEqual([mockBooks[1]]);
  });

  it('should match all words across fields using AND logic', () => {
    const result = filterBooks(mockBooks, 'React Dan');
    expect(result).toEqual([mockBooks[0]]);
  });

  it('should require all words to match', () => {
    const result = filterBooks(mockBooks, 'React Unknown');
    expect(result).toEqual([]);
  });

  it('should return empty array if no matches found', () => {
    expect(filterBooks(mockBooks, 'angular')).toEqual([]);
  });
});
