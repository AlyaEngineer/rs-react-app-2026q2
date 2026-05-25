import { render, screen } from '@testing-library/react';
import { BookDetails } from '@/entities/book/ui/BookDetails';
import type { BookDetails as BookDetailsType } from '@/entities/book/model/types';
import { vi, describe, it, expect } from 'vitest';

vi.mock('@/entities/book/model/getCoverUrl', () => ({
  getCoverUrl: () => 'https://example.com/cover.jpg',
}));
vi.mock('@/entities/book/model/getAuthorPhotoUrl', () => ({
  getAuthorPhotoUrl: (id: number) =>
    `https://covers.openlibrary.org/a/id/${id}-M.jpg`,
}));

const baseBook: BookDetailsType = {
  title: 'Dune',
  authors: [{ name: 'Frank Herbert', birthDate: '1920-10-08' }],
  subjects: ['Science Fiction'],
};

describe('BookDetails', () => {
  it('renders the book title', () => {
    render(<BookDetails book={baseBook} />);
    expect(screen.getByRole('heading', { name: 'Dune' })).toBeInTheDocument();
  });

  it('renders the cover with the book title as alt text', () => {
    render(<BookDetails book={baseBook} />);
    expect(screen.getByRole('img', { name: 'Dune' })).toBeInTheDocument();
  });

  it('should render author name', () => {
    render(<BookDetails book={baseBook} />);
    expect(screen.getByText('Frank Herbert')).toBeInTheDocument();
  });

  it('should render author birth date when provided', () => {
    render(<BookDetails book={baseBook} />);
    expect(screen.getByText(/1920-10-08/)).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <BookDetails book={{ ...baseBook, description: 'A desert planet.' }} />
    );
    expect(screen.getByText('A desert planet.')).toBeInTheDocument();
  });

  it('does not render the description section when absent', () => {
    render(<BookDetails book={baseBook} />);
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });
});
