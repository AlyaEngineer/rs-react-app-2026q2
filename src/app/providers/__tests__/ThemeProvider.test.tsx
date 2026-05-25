import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ThemeToggleButton } from '@/widgets/header/ui/ThemeToggleButton';

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <ThemeToggleButton />
    </ThemeProvider>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should use light theme by default', () => {
    renderWithTheme();
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeInTheDocument();
  });

  it('should read theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');
    renderWithTheme();
    expect(
      screen.getByRole('button', { name: 'Switch to light theme' })
    ).toBeInTheDocument();
  });

  it('should toggle theme from light to dark', async () => {
    const user = userEvent.setup();
    renderWithTheme();
    await user.click(screen.getByRole('button'));
    expect(
      screen.getByRole('button', { name: 'Switch to light theme' })
    ).toBeInTheDocument();
  });

  it('should toggle theme from dark to light', async () => {
    const user = userEvent.setup();
    localStorage.setItem('theme', 'dark');
    renderWithTheme();
    await user.click(screen.getByRole('button'));
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeInTheDocument();
  });

  it('should save theme to localStorage on toggle', async () => {
    const user = userEvent.setup();
    renderWithTheme();
    await user.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
