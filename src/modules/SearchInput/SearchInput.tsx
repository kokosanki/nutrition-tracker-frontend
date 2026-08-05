import { useState } from "react";
import type { KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ placeholder, defaultValue = "", onSearch }: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className={styles.searchInput}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles.button}
        type="button"
        aria-label="Search"
        onClick={() => onSearch(value)}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchInput;
