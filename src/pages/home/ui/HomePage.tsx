import { Component } from 'react';
import Search from '@/features/book-search/ui/Search';
import BookList from '@/widgets/book-list/BookList';
import { type Book } from '@/entities/book/model/types';
import { getBooks } from '@/features/book-search/api/getBooks';
import ErrorTestButton from '@/app/ui/ErrorTestButton';

interface State {
  searchTerm: string;
  results: Book[];
  isLoading: boolean;
  error: string | null;
}

class HomePage extends Component<object, State> {
  constructor(props: object) {
    super(props);
    const savedSearch = localStorage.getItem('search_query') ?? '';
    this.state = {
      searchTerm: savedSearch,
      results: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    void this.search(this.state.searchTerm);
  }

  search = async (term: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const books = await getBooks(term);

      this.setState({
        results: books,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        error: err instanceof Error ? err.message : 'Something went wrong',
        isLoading: false,
        results: [],
      });
    }
  };

  handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    const savedSearch = localStorage.getItem('search_query') ?? '';

    const isSameAsState = trimmedTerm === this.state.searchTerm;
    const isSameAsSaved = trimmedTerm === savedSearch;

    if (isSameAsState && isSameAsSaved && this.state.results.length > 0) {
      return;
    }

    localStorage.setItem('search_query', trimmedTerm);

    this.setState({ searchTerm: trimmedTerm });
    void this.search(trimmedTerm);
  };

  render() {
    const { results, isLoading, error, searchTerm } = this.state;

    return (
      <div className="from-primary/10 via-secondary/30 to-accent/20 text-foreground flex min-h-screen flex-col bg-linear-to-br pt-12">
        <div className="mx-auto mb-12 w-full max-w-7xl space-y-8 px-6">
          <header className="text-center">
            <h1 className="text-foreground mb-8 text-5xl font-bold">
              Discover Your Next Lovely Book
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              <span>Dive into millions of books in the open library</span>
              <span className="block">for every book ever published</span>
            </p>
          </header>

          <section className="bg-card border-border rounded-xl border p-6 shadow-sm">
            <Search initialValue={searchTerm} onSearch={this.handleSearch} />
          </section>

          <ErrorTestButton />
        </div>

        <section className="bg-background w-full grow p-12">
          <div className="text-muted-foreground mx-auto max-w-7xl">
            {isLoading && (
              <div className="flex justify-center p-12">
                <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-xl border p-16 text-center">
                <p className="font-medium">Oooops! Error...</p>
                <p>{error}</p>
              </div>
            )}

            {!isLoading &&
              !error &&
              (results.length > 0 ? (
                <BookList items={results} />
              ) : (
                <div className="bg-accent/10 text-accent border-accent rounded-xl border p-16 text-center">
                  <p className="text-muted-foreground text-center font-medium">
                    No books found. Try another search.
                  </p>
                </div>
              ))}
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
