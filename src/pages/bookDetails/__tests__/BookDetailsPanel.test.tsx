import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { BookDetailsPanel } from '../ui/BookDetailsPanel';
import { openLibraryApi } from '@/shared/api/openLibraryApi';

const mockDispatch = vi.fn();

vi.mock('@/app/store/store', () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock('@/entities/book/ui/BookDetails', () => ({
  BookDetails: () => <div>Book Details Component</div>,
}));

vi.mock('@/pages/bookDetails/ui/BookDetailsCloseButton', () => ({
  BookDetailsCloseButton: () => <button>Close</button>,
}));

vi.mock('@/shared/ui/RefreshButton', () => ({
  RefreshButton: ({ onRefresh }: { onRefresh: () => void }) => (
    <button onClick={onRefresh}>Refresh</button>
  ),
}));

describe('BookDetailsPanel', () => {
  const book = {
    title: 'Clean Code',
    authors: [],
    coverId: 1,
    subjects: [],
  };

  it('renders panel and book details', () => {
    render(<BookDetailsPanel book={book} id="OL1W" />);

    expect(screen.getByTestId('book-details-overlay')).toBeInTheDocument();

    expect(screen.getByText('Book Details Component')).toBeInTheDocument();
  });

  it('invalidates BookDetails tag on refresh', async () => {
    const user = userEvent.setup();

    render(<BookDetailsPanel book={book} id="OL1W" />);

    await user.click(screen.getByRole('button', { name: 'Refresh' }));

    expect(mockDispatch).toHaveBeenCalledWith(
      openLibraryApi.util.invalidateTags([
        {
          type: 'BookDetails',
          id: 'OL1W',
        },
      ])
    );
  });
});
