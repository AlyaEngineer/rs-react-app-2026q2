import { type ChangeEvent, type SubmitEvent, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { RefreshButton } from '@/shared/ui/RefreshButton';

interface Props {
  initialValue: string;
  onSearch: (term: string) => void;
  onRefresh: () => void;
}

function Search({ initialValue, onSearch, onRefresh }: Props) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    setInputValue(trimmedValue);
    onSearch(trimmedValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 sm:flex-row"
    >
      <div className="bg-input-background text-foreground border-border focus-within:border-primary focus-within:ring-primary/30 dark:bg-input/30 flex grow items-center gap-2 rounded-lg border px-3 py-2 transition-[color,box-shadow] duration-200 focus-within:ring-[3px]">
        <SearchIcon className="text-muted-foreground h-5 w-5 shrink-0" />
        <input
          type="search"
          name="search"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
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

      <RefreshButton onRefresh={onRefresh} />
    </form>
  );
}

export default Search;
