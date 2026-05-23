import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '@/pages/home/ui/HomePage';
import ErrorBoundary from '@/app/ui/ErrorBoundary';
import ErrorFallback from '@/app/ui/ErrorFallback';
import { getBooks } from '@/features/book-search/api/getBooks';
import { type Book } from '@/entities/book/model/types';
import ErrorTestButton from '@/app/ui/ErrorTestButton';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { store } from '@/app/store/store';
import { Provider } from 'react-redux';

vi.mock('@/features/book-search/api/getBooks', () => ({
  getBooks: vi.fn(),
}));

export async function renderWithRouter(ui: React.ReactElement) {
  const router = createRouter({
    routeTree: createRootRoute({ component: () => ui }),
  });

  await router.load();

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

describe('HomePage integration tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should handle empty localStorage on mount, write search query on user action and display results', async () => {
    const user = userEvent.setup();
    const mockBooks: Book[] = [
      {
        id: 'OL123M',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        year: 2008,
        coverId: 12345,
      },
      {
        id: 'OL456M',
        title: 'Refactoring',
        author: 'Martin Fowler',
        year: 0,
      },
    ];
    vi.mocked(getBooks).mockResolvedValue({ books: mockBooks, totalBooks: 2 });

    await renderWithRouter(<HomePage />);

    const input = screen.getByPlaceholderText(/Start typing/i);
    await user.type(input, 'Clean Code{Enter}');

    expect(localStorage.getItem('search_query')).toBe('Clean Code');
    expect(getBooks).toHaveBeenCalledWith('Clean Code', undefined);

    await waitFor(() => {
      expect(screen.getByText(/Clean Code/i)).toBeInTheDocument();
      expect(screen.getByText(/Robert C\. Martin/i)).toBeInTheDocument();
      expect(screen.getByText(/2008/i)).toBeInTheDocument();

      expect(screen.getByText(/Refactoring/i)).toBeInTheDocument();
      expect(screen.getByText(/Martin Fowler/i)).toBeInTheDocument();
      expect(screen.getByText(/N\/A/i)).toBeInTheDocument();
    });
  });

  it('should avoid duplicate search requests for the same query', async () => {
    const user = userEvent.setup();
    const mockBooks: Book[] = [
      {
        id: 'OL456M',
        title: 'Refactoring',
        author: 'Martin Fowler',
        year: 0,
      },
    ];

    vi.mocked(getBooks).mockResolvedValue({ books: mockBooks, totalBooks: 2 });

    await renderWithRouter(<HomePage />);

    const input = screen.getByPlaceholderText(/start typing/i);

    expect(getBooks).toHaveBeenCalledTimes(1);

    await user.type(input, 'Refactoring{Enter}');
    expect(getBooks).toHaveBeenCalledTimes(2);

    await user.type(input, '{Enter}');
    expect(getBooks).toHaveBeenCalledTimes(2);
  });

  it('should automatically read and apply search query from localStorage on mount', async () => {
    localStorage.setItem('search_query', 'Refactoring');
    vi.mocked(getBooks).mockResolvedValue({ books: [], totalBooks: 0 });

    await renderWithRouter(<HomePage />);

    const input = screen.getByPlaceholderText(
      /Start typing/i
    ) as HTMLInputElement;
    expect(input.value).toBe('Refactoring');

    await waitFor(() => {
      expect(getBooks).toHaveBeenCalledWith('Refactoring', undefined);
    });
  });

  it('should handle API failures and display the error message to the user', async () => {
    const user = userEvent.setup();
    vi.mocked(getBooks).mockRejectedValue(
      new Error('Error 500: Server is temporarily unavailable')
    );

    await renderWithRouter(<HomePage />);

    const input = screen.getByPlaceholderText(/Start typing/i);
    await user.type(input, 'InvalidQuery{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Oooops! Error...')).toBeInTheDocument();
      expect(
        screen.getByText('Error 500: Server is temporarily unavailable')
      ).toBeInTheDocument();
    });
  });

  it('should display fallback UI when a rendering error occurs', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const originalLocation = window.location;

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() },
    });

    await renderWithRouter(
      <ErrorBoundary fallback={<ErrorFallback />}>
        <ErrorTestButton />
      </ErrorBoundary>
    );

    const triggerButton = screen.getByRole('button', {
      name: /click me to trigger the error/i,
    });
    expect(triggerButton).toBeInTheDocument();

    await user.click(triggerButton);

    const heading = screen.getByRole('heading', {
      name: /something went wrong/i,
    });
    expect(heading).toBeInTheDocument();

    const reloadButton = screen.getByRole('button', { name: /reload page/i });
    expect(reloadButton).toBeInTheDocument();

    await user.click(reloadButton);
    expect(window.location.reload).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });
});
