import { Component, type ChangeEvent, type SubmitEvent } from 'react';

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
        <input
          type="search"
          name="search"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Start typing a book title or author..."
          className="grow px-4 py-2 rounded-lg outline-none bg-input-background text-foreground placeholder:text-muted-foreground border border-border transition-[color,box-shadow] duration-200 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/30 dark:bg-input/30"
        />
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
