import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggleButton } from '@/widgets/header/ui/ThemeToggleButton';
import { ThemeContext } from '@/app/model/themeContext';

function renderWithTheme(theme: 'light' | 'dark') {
  const toggleTheme = vi.fn();
  render(
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeToggleButton />
    </ThemeContext.Provider>
  );
  return { toggleTheme };
}

describe('ThemeToggleButton', () => {
  it('should show "Switch to dark theme" label in light mode', () => {
    renderWithTheme('light');
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeInTheDocument();
  });

  it('should show "Switch to light theme" label in dark mode', () => {
    renderWithTheme('dark');
    expect(
      screen.getByRole('button', { name: 'Switch to light theme' })
    ).toBeInTheDocument();
  });

  it('should call toggleTheme on click', async () => {
    const user = userEvent.setup();
    const { toggleTheme } = renderWithTheme('light');
    await user.click(screen.getByRole('button'));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
