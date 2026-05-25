import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme } from '@/app/model/themeContext';

const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'light';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(THEME_STORAGE_KEY) ?? DEFAULT_THEME) as Theme
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
