import { Component, type ChangeEvent, type SubmitEvent } from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface Props {
  initialValue: string;
  onSearch: (term: string) => void;
}

interface State {
  inputValue: string;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: props.initialValue,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ inputValue: this.props.initialValue });
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const trimmedValue = this.state.inputValue.trim();
    this.props.onSearch(trimmedValue);
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex w-full flex-col gap-2 sm:flex-row"
      >
        <div className="bg-input-background text-foreground border-border focus-within:border-primary focus-within:ring-primary/30 dark:bg-input/30 flex grow items-center gap-2 rounded-lg border px-3 py-2 transition-[color,box-shadow] duration-200 focus-within:ring-[3px]">
          <SearchIcon className="text-muted-foreground h-5 w-5 shrink-0" />
          <input
            type="search"
            name="search"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Start typing a book title or author..."
            className="placeholder:text-muted-foreground text-foreground w-full bg-transparent text-lg outline-none placeholder:text-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground cursor-pointer rounded-lg px-6 py-2 text-lg transition-opacity hover:opacity-90 active:scale-95"
        >
          Search
        </button>
      </form>
    );
  }
}

export default Search;
