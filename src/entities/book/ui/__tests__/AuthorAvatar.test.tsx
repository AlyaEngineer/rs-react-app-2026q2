import { render, screen } from '@testing-library/react';
import { AuthorAvatar } from '@/entities/book/ui/AuthorAvatar';
import { vi, describe, it, expect } from 'vitest';
import { AUTHOR_BASE_URL, DEFAULT_IMAGE_SIZE } from '@/shared/config/covers';

vi.mock('@/entities/book/model/getAuthorPhotoUrl', () => ({
  getAuthorPhotoUrl: (id: number) =>
    `${AUTHOR_BASE_URL}/id/${id}-${DEFAULT_IMAGE_SIZE}.jpg`,
}));

describe('AuthorAvatar', () => {
  it('renders an img with the author name as alt when photoId is provided', () => {
    render(<AuthorAvatar photoId={123} name="Frank Herbert" />);
    expect(
      screen.getByRole('img', { name: 'Frank Herbert' })
    ).toBeInTheDocument();
  });

  it('renders the fallback icon when photoId is absent', () => {
    render(<AuthorAvatar name="Unknown" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
