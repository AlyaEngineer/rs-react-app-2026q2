import { Component } from 'react';
import Search from './features/book-search/ui/Search';
import BookList from './widgets/book-list/BookList';
import { type Book } from './entities/book/model/types';
import { getBooks } from './features/book-search/api/getBooks';
import ErrorTestButton from './app/ui/ErrorTestButton';

interface State {
  searchTerm: string;
  results: Book[];
  isLoading: boolean;
  error: string | null;
}

class App extends Component<object, State> {
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
      <div className="min-h-screen bg-linear-to-br from-primary/10 via-secondary/30 to-accent/20 text-foreground pt-12 flex flex-col">
        <div className="max-w-7xl w-full mx-auto px-6 space-y-8 mb-12">
          <header className="text-center">
            <h1 className="text-5xl font-bold text-foreground mb-8">
              Discover Your Next Lovely Book
            </h1>

            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              <span>Dive into millions of books in the open library</span>
              <span className="block">for every book ever published</span>
            </p>
          </header>

          <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <Search initialValue={searchTerm} onSearch={this.handleSearch} />
          </section>

          <ErrorTestButton />
        </div>

        <section className="w-full bg-background grow p-12">
          <div className="max-w-7xl mx-auto text-muted-foreground">
            {isLoading && (
              <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}

            {error && (
              <div className="p-16 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl text-center">
                <p className="font-medium">Oooops! Error...</p>
                <p>{error}</p>
              </div>
            )}

            {!isLoading &&
              !error &&
              (results.length > 0 ? (
                <BookList items={results} />
              ) : (
                <div className="p-16 bg-accent/10 text-accent border border-accent rounded-xl text-center">
                  <p className="text-center text-muted-foreground font-medium">
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

export default App;
