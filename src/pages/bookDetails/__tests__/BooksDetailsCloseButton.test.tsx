import { render, screen, fireEvent } from '@testing-library/react';
import { BookDetailsCloseButton } from '@/pages/bookDetails/ui/BookDetailsCloseButton';
import { vi, describe, beforeEach, it, expect } from 'vitest';

const mockNavigate = vi.fn();
const mockUseSearch = vi.fn();

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/routes/_layout', () => ({
  Route: {
    useSearch: () => mockUseSearch(),
  },
}));

describe('BookDetailsCloseButton', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockUseSearch.mockReturnValue({ page: 1 });
  });

  it('calls navigate with correct args on click', () => {
    mockUseSearch.mockReturnValue({ page: 3 });
    render(<BookDetailsCloseButton />);
    fireEvent.click(screen.getByTestId('book-details-close-button'));
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/',
      resetScroll: false,
      search: { page: 3 },
    });
  });
});
