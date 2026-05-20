import type { OpenLibraryDoc } from '@/shared/api/types';
import { type Book } from '@/entities/book/model/types';

export const mapBook = (doc: OpenLibraryDoc): Book => ({
  id: doc.key,
  title: doc.title,
  author: doc.author_name?.join(', ') ?? 'Unknown Author',
  authorKeys: doc.author_key,
  year: doc.first_publish_year,
  subjects: doc.subject?.slice(0, 3) ?? [],
  coverId: doc.cover_i,
  isbn: doc.isbn?.[0],
  olid: doc.edition_key?.[0],
  oclc: doc.oclc?.[0],
  lccn: doc.lccn?.[0],
  editionCount: doc.edition_count ?? 0,
});
