import { Sun as LightThemeIcon, Moon as DarkThemeIcon } from 'lucide-react';
import { useTheme } from '@/app/model/themeContext';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      }
      className="text-foreground hover:text-primary transition-colors hover:cursor-pointer"
    >
      {theme === 'dark' ? (
        <LightThemeIcon
          strokeWidth={1.5}
          className="h-6 w-6"
          aria-hidden="true"
        />
      ) : (
        <DarkThemeIcon
          strokeWidth={1.5}
          className="h-6 w-6"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
