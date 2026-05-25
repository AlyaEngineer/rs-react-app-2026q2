import { getCoverUrl } from '@/entities/book/model/getCoverUrl';
import type { Book } from '@/entities/book/model/types';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

export const downloadCsv = (selectedBooks: Book[]) => {
  if (selectedBooks.length === 0) return;
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

  const blob = new Blob(['\ufeff' + csvContent], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${String(selectedBooks.length)}_items.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
