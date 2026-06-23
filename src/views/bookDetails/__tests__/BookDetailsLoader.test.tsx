import { render, screen } from '@testing-library/react';
import { BookDetailsLoader } from '@/views/bookDetails/ui/BookDetailsLoader';
import { describe, it, expect } from 'vitest';

describe('BookDetailsLoader', () => {
  it('shows loading text', () => {
    render(<BookDetailsLoader />);
    expect(screen.getByText('Loading book details...')).toBeInTheDocument();
  });
});
