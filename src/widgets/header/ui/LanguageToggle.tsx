'use client';

import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const switchTo = locale === 'ru' ? 'en' : 'ru';

  function handleClick() {
    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });

    router.replace({ pathname, query }, { locale: switchTo });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-foreground hover:text-primary flex items-center gap-2 rounded border px-3 py-2 transition-colors hover:cursor-pointer"
    >
      <Languages size={18} />
      {switchTo.toUpperCase()}
    </button>
  );
}
