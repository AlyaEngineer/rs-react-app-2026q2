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
      <form onSubmit={this.handleSubmit} className="flex w-full gap-2">
        <div className="flex grow items-center gap-2 px-3 py-2 rounded-lg bg-input-background text-foreground border border-border transition-[color,box-shadow] duration-200 focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/30 dark:bg-input/30">
          <SearchIcon className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="search"
            name="search"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Start typing a book title or author..."
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground placeholder:text-lg text-foreground text-lg"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity active:scale-95 cursor-pointer"
        >
          Search
        </button>
      </form>
    );
  }
}

export default Search;
