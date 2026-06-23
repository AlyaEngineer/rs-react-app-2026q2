import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ErrorTestButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  const t = useTranslations('erroTestButton');

  if (shouldThrow) {
    throw new Error('ErrorBoundary caught an error');
  }

  return (
    <button
      onClick={() => {
        setShouldThrow(true);
      }}
      className="bg-destructive/10 hover:bg-button-error-hover flex w-1/4 cursor-pointer items-center justify-center gap-2.5 rounded-2xl p-2 text-gray-600 shadow-xl inset-shadow-sm transition delay-150 duration-300 ease-in-out text-shadow-2xs hover:shadow-xl/20 max-md:w-full"
    >
      {t('click me')}
    </button>
  );
}
