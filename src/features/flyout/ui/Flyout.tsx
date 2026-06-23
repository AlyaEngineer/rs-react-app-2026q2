'use client';

import { useTranslations } from 'next-intl';
import { generateCsv } from '@/features/flyout/model/generateCsv';
import { downloadCsvFile } from '@/features/flyout/model/downloadCsvFile';
import { clearSelectedBooks } from '@/shared/store/bookCardSlice/bookCardSlice';
import {
  selectSelectedBooks,
  selectSelectedBooksCount,
} from '@/shared/store/bookCardSlice/bookCardSlice.selectors';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

export function Flyout() {
  const t = useTranslations('flyout');
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectSelectedBooksCount);
  const selectedBooks = useAppSelector(selectSelectedBooks);

  if (count === 0) return null;

  const handleDownload = async () => {
    const csvContent = await generateCsv(selectedBooks);
    downloadCsvFile(csvContent, `${String(selectedBooks.length)}_items.csv`);
  };

  return (
    <div className="bg-muted-foreground/70 border-border fixed bottom-0 left-0 z-50 flex w-full flex-wrap items-center justify-center border-t px-6 py-4 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 sm:flex-row">
        <p className="text-primary-foreground font-medium whitespace-nowrap">
          {t('selected')}:<span className="font-bold"> {count}</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => dispatch(clearSelectedBooks())}
            aria-label={t('unselectAria')}
            className="border-secondary/80 text-primary-foreground hover:bg-secondary/10 cursor-pointer rounded-lg border px-4 py-2 text-sm whitespace-nowrap transition-all duration-300"
          >
            {t('unselect')}
          </button>

          <button
            aria-label={t('downloadAria')}
            onClick={() => void handleDownload()}
            className="bg-accent/20 border-accent text-primary-foreground hover:bg-accent/30 cursor-pointer rounded-lg border px-4 py-2 text-sm whitespace-nowrap transition-all duration-300"
          >
            {t('download')}
          </button>
        </div>
      </div>
    </div>
  );
}
