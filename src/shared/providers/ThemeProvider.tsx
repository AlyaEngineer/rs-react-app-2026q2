'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme } from '@/shared/model/themeContext';

const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'light';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  return (
    (localStorage.getItem(THEME_STORAGE_KEY) as Theme | null) ?? DEFAULT_THEME
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

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
