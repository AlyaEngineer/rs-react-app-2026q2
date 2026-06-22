import { render, screen } from '@testing-library/react';
import { BookDetailsError } from '@/views/bookDetails/ui/BookDetailsError';
import { vi, describe, it, expect } from 'vitest';

vi.mock('@/views/bookDetails/ui/BookDetailsCloseButton', () => ({
  BookDetailsCloseButton: () => (
    <button data-testid="book-details-close-button">Close</button>
  ),
}));

describe('BookDetailsError', () => {
  it('should display error message', () => {
    render(<BookDetailsError />);
    expect(screen.getByText('Failed to load book details')).toBeInTheDocument();
  });

  it('should display retry suggestion', () => {
    render(<BookDetailsError />);
    expect(screen.getByText('Please try again later')).toBeInTheDocument();
  });

  it('should render close button', () => {
    render(<BookDetailsError />);
    expect(screen.getByTestId('book-details-close-button')).toBeInTheDocument();
  });
});
