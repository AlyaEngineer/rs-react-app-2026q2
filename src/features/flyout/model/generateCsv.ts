'use server';

import { getCoverUrl } from '@/entities/book/model/getCoverUrl';
import type { Book } from '@/entities/book/model/types';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateCsv(selectedBooks: Book[]): Promise<string> {
  const headers = [
    'ID',
    'Title',
    'Author',
    'First Published Year',
    'Cover URL',
    'Details URL',
  ];

  const rows = selectedBooks.map((book) => [
    `"${book.id}"`,
    `"${book.title}"`,
    `"${book.author || 'Unknown Author'}"`,
    `"${book.year?.toString() ?? 'N/A'}"`,
    `"${book.coverId ? getCoverUrl(book.coverId) : 'No cover available'}"`,
    `"${OPEN_LIBRARY_BASE_URL}${book.id}"`,
  ]);

  const csvContent = [
    headers.join(', '),
    '',
    ...rows.map((row) => row.join(', ')),
  ].join('\r\n');

  return '\ufeff' + csvContent;
}
