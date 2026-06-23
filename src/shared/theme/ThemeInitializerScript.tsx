'use client';

import { useServerInsertedHTML } from 'next/navigation';

const themeScript = `
(function() {
  try {
    const t = localStorage.getItem('theme');
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch {}
})();
`;

export function ThemeScript() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
  ));
  return null;
}
