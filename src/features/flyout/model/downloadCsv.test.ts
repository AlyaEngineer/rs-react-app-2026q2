import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadCsv } from '@/features/flyout/model/downloadCsv';
import type { Book } from '@/entities/book/model/types';
import { AUTHOR_BASE_URL, DEFAULT_IMAGE_SIZE } from '@/shared/config/covers';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/config/openLibraryApi';

vi.mock('@/entities/book/model/getCoverUrl', () => ({
  getCoverUrl: (id: number) =>
    `${AUTHOR_BASE_URL}/b/${id}-${DEFAULT_IMAGE_SIZE}.jpg`,
}));

const book: Book = {
  id: '/works/OL1W',
  title: 'Dune',
  author: 'Frank Herbert',
  year: 1965,
  coverId: 123,
};

describe('downloadCsv', () => {
  beforeEach(() => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    vi.spyOn(document.body, 'appendChild').mockImplementation((el) => el);
    vi.spyOn(document.body, 'removeChild').mockImplementation((el) => el);
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  it('should do nothing when books list is empty', () => {
    downloadCsv([]);
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('should trigger download', () => {
    downloadCsv([book]);
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('should include book fields in csv content', () => {
    let csvContent = '';
    const OriginalBlob = globalThis.Blob;
    vi.stubGlobal(
      'Blob',
      function (parts: BlobPart[], options?: BlobPropertyBag) {
        csvContent = (parts as string[]).join('');
        return new OriginalBlob(parts, options);
      }
    );

    downloadCsv([book]);

    expect(csvContent).toContain('Dune');
    expect(csvContent).toContain('Frank Herbert');
    expect(csvContent).toContain('1965');
    expect(csvContent).toContain(`${OPEN_LIBRARY_BASE_URL}${book.id}`);

    vi.unstubAllGlobals();
  });

  it('should revoke object url after download', () => {
    downloadCsv([book]);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });
});
