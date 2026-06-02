import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '@/pages/home/ui/HomePage';
import ErrorBoundary from '@/app/ui/ErrorBoundary';
import ErrorFallback from '@/app/ui/ErrorFallback';
import ErrorTestButton from '@/app/ui/ErrorTestButton';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { store } from '@/app/store/store';
import { Provider } from 'react-redux';
import * as searchApiModule from '@/features/book-search/api/searchApi';
import type { Book } from '@/entities/book/model/types';
import type { useBookListQuery } from '@/features/book-search/api/searchApi';

vi.mock('@/features/book-search/api/searchApi', () => ({
  useBookListQuery: vi.fn(),
}));

const mockUseSearchBooksQuery = vi.mocked(searchApiModule.useBookListQuery);

const defaultQueryState = {
  data: undefined,
  isFetching: false,
  isError: false,
  error: undefined,
  refetch: vi.fn(),
};

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
    mockUseSearchBooksQuery.mockReturnValue(
      defaultQueryState as ReturnType<typeof useBookListQuery>
    );
  });

  it('should display books when query returns results', async () => {
    const mockBooks: Book[] = [
      {
        id: 'OL123M',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        year: 2008,
        coverId: 12345,
      },
      { id: 'OL456M', title: 'Refactoring', author: 'Martin Fowler', year: 0 },
    ];

    mockUseSearchBooksQuery.mockReturnValue({
      ...defaultQueryState,
      data: { books: mockBooks, totalBooks: 2 },
    } as ReturnType<typeof useBookListQuery>);

    await renderWithRouter(<HomePage />);

    expect(screen.getByText(/Clean Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Robert C\. Martin/i)).toBeInTheDocument();
    expect(screen.getByText(/2008/i)).toBeInTheDocument();

    expect(screen.getByText(/Refactoring/i)).toBeInTheDocument();
    expect(screen.getByText(/Martin Fowler/i)).toBeInTheDocument();
  });

  it('should display loading indicator while fetching', async () => {
    mockUseSearchBooksQuery.mockReturnValue({
      ...defaultQueryState,
      isFetching: true,
    } as ReturnType<typeof useBookListQuery>);

    const { container } = await renderWithRouter(<HomePage />);

    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('should display error message when query fails', async () => {
    mockUseSearchBooksQuery.mockReturnValue({
      ...defaultQueryState,
      isError: true,
      error: { status: 500 },
    } as ReturnType<typeof useBookListQuery>);

    await renderWithRouter(<HomePage />);

    expect(screen.getByText('Oooops! Error...')).toBeInTheDocument();
    expect(screen.getByText(/Error 500/i)).toBeInTheDocument();
  });

  it('should read search query from localStorage on mount', async () => {
    localStorage.setItem('search_query', 'Refactoring');

    await renderWithRouter(<HomePage />);

    const input = screen.getByPlaceholderText(
      /Start typing/i
    ) as HTMLInputElement;
    expect(input.value).toBe('Refactoring');
  });

  it('should update localStorage when user searches', async () => {
    const user = userEvent.setup();

    await renderWithRouter(<HomePage />);

    const input = screen.getByPlaceholderText(/Start typing/i);
    await user.type(input, 'Clean Code{Enter}');

    expect(localStorage.getItem('search_query')).toBe('Clean Code');
  });

  it('should show empty state when no books found', async () => {
    mockUseSearchBooksQuery.mockReturnValue({
      ...defaultQueryState,
      data: { books: [], totalBooks: 0 },
    } as ReturnType<typeof useBookListQuery>);

    await renderWithRouter(<HomePage />);

    expect(screen.getByText(/No books found/i)).toBeInTheDocument();
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
    await user.click(triggerButton);

    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeInTheDocument();

    const reloadButton = screen.getByRole('button', { name: /reload page/i });
    await user.click(reloadButton);
    expect(window.location.reload).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });
});
