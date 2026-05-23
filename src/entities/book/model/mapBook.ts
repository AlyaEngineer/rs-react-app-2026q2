import type { OpenLibraryDoc } from '@/shared/api/types';
import { type Book } from '@/entities/book/model/types';

export const mapBook = (doc: OpenLibraryDoc): Book => ({
  id: doc.key,
  title: doc.title,
  author: doc.author_name?.join(', ') ?? 'Unknown Author',
  authorKeys: doc.author_key,
  year: doc.first_publish_year,
  coverId: doc.cover_i,
});
