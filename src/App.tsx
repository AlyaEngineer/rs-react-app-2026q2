import { Component } from 'react';
import Search from './features/book-search/ui/Search';

interface State {
  searchTerm: string;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    const savedSearch = localStorage.getItem('search_query') ?? '';
    this.state = {
      searchTerm: savedSearch,
    };
  }

  handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    const savedSearch = localStorage.getItem('search_query') ?? '';

    if (trimmedTerm === this.state.searchTerm && savedSearch !== '') {
      console.log('Поисковый запрос не изменился, поиск не выполняем');
      return;
    }

    console.log('Выполняем поиск для запроса:', trimmedTerm);

    localStorage.setItem('search_query', trimmedTerm);

    this.setState({ searchTerm: trimmedTerm });

    // вызов API
  };

  render() {
    return (
      <div className="min-h-screen bg-background text-foreground p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="text-center">
            <h1 className="text-5xl font-bold text-foreground mb-2">
              Discover Your Next Lovely Book
            </h1>

            <h2 className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Dive into millions of books in the open library for every book
              ever published
            </h2>
          </header>

          <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <Search initialValue={searchTerm} onSearch={this.handleSearch} />
          </section>

          <section className="border-2 border-dashed border-muted rounded-xl h-64 flex items-center justify-center text-muted-foreground">
            Results will appear here
          </section>
        </div>
      </div>
    );
  }
}

export default App;
