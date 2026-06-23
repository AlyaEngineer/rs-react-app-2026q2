import { Sun as LightThemeIcon, Moon as DarkThemeIcon } from 'lucide-react';
import { useTheme } from '@/shared/model/themeContext';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      suppressHydrationWarning
      aria-label={
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      }
      className="text-foreground hover:text-primary transition-colors hover:cursor-pointer"
    >
      <LightThemeIcon
        strokeWidth={1.5}
        className="hidden h-6 w-6 dark:block"
        aria-hidden="true"
      />
      <DarkThemeIcon
        strokeWidth={1.5}
        className="block h-6 w-6 dark:hidden"
        aria-hidden="true"
      />
    </button>
  );
}
