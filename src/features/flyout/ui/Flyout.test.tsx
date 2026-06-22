import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { bookCardsReducer } from '@/shared/store/bookCardSlice/bookCardSlice';
import { Flyout } from '@/features/flyout/ui/Flyout';
import type { Book } from '@/entities/book/model/types';

vi.mock('@/features/flyout/model/generateCsv', () => ({
  generateCsv: vi.fn(() => Promise.resolve('mocked,csv,content')),
}));

vi.mock('@/features/flyout/model/downloadCsvFile', () => ({
  downloadCsvFile: vi.fn(),
}));

import { generateCsv } from '@/features/flyout/model/generateCsv';
import { downloadCsvFile } from '@/features/flyout/model/downloadCsvFile';

const book: Book = {
  id: '/works/OL1W',
  title: 'Dune',
  author: 'Frank Herbert',
};

function makeStore(selectedBooks: Book[] = []) {
  return configureStore({
    reducer: { bookCards: bookCardsReducer },
    preloadedState: { bookCards: { selectedBooks } },
  });
}

function renderFlyout(selectedBooks: Book[] = []) {
  return render(
    <Provider store={makeStore(selectedBooks)}>
      <Flyout />
    </Provider>
  );
}

describe('Flyout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when no books selected', () => {
    renderFlyout([]);
    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
  });

  it('should render when books are selected', () => {
    renderFlyout([book]);
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
  });

  it('should display selected books count', () => {
    renderFlyout([book]);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should clear selection on "Unselect all" click', async () => {
    const user = userEvent.setup();
    renderFlyout([book]);
    await user.click(
      screen.getByRole('button', { name: 'Unselect all books' })
    );
    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
  });

  it('should generate csv on server and trigger download on Download click', async () => {
    const user = userEvent.setup();
    renderFlyout([book]);
    await user.click(
      screen.getByRole('button', { name: 'Download selected books as CSV' })
    );
    expect(generateCsv).toHaveBeenCalledWith([book]);
    expect(downloadCsvFile).toHaveBeenCalledWith(
      'mocked,csv,content',
      '1_items.csv'
    );
  });
});
