import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadCsvFile } from '@/features/flyout/model/downloadCsvFile';

describe('downloadCsvFile', () => {
  beforeEach(() => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    vi.spyOn(document.body, 'appendChild').mockImplementation((el) => el);
    vi.spyOn(document.body, 'removeChild').mockImplementation((el) => el);
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  it('should trigger download', () => {
    downloadCsvFile('some,csv,content', 'test.csv');
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('should create object url from content', () => {
    downloadCsvFile('some,csv,content', 'test.csv');
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('should revoke object url after download', () => {
    downloadCsvFile('some,csv,content', 'test.csv');
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });
});
