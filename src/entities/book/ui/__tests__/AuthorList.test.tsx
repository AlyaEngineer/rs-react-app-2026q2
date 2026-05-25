import { render, screen } from '@testing-library/react';
import { AuthorList } from '@/entities/book/ui/AuthorList';
import { vi, describe, it, expect } from 'vitest';
import { AUTHOR_BASE_URL, DEFAULT_IMAGE_SIZE } from '@/shared/config/covers';

vi.mock('@/entities/book/model/getAuthorPhotoUrl', () => ({
  getAuthorPhotoUrl: (id: number) =>
    `${AUTHOR_BASE_URL}/id/${id}-${DEFAULT_IMAGE_SIZE}.jpg`,
}));

describe('AuthorList', () => {
  it('renders author name', () => {
    render(<AuthorList authors={[{ name: 'Frank Herbert' }]} />);
    expect(screen.getByText('Frank Herbert')).toBeInTheDocument();
  });

  it('shows birthDate when provided', () => {
    render(
      <AuthorList
        authors={[{ name: 'Isaac Asimov', birthDate: '1920-01-02' }]}
      />
    );
    expect(screen.getByText(/1920-01-02/)).toBeInTheDocument();
  });

  it('shows N/A when birthDate is absent and author is not a contributor', () => {
    render(<AuthorList authors={[{ name: 'Frank Herbert' }]} />);
    expect(screen.getByText(/N\/A/)).toBeInTheDocument();
  });

  it('shows "Contributor" label for contributors', () => {
    render(
      <AuthorList authors={[{ name: 'Ed. Board', isContributor: true }]} />
    );
    expect(screen.getByText('Contributor')).toBeInTheDocument();
  });

  it('renders the "Unknown Author" fallback when the list is empty', () => {
    render(<AuthorList authors={[]} />);
    expect(screen.getByText('Unknown Author')).toBeInTheDocument();
  });
});
