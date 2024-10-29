import React from "react";
import styles from "./SearchResult.module.css";
import BookList from "../../components/BookList/BookList";

interface SearchResultProps {
  searchTerm: string;
  searchResult: Book[];
  setCurrentBook: (book: Book) => void;
  setCurrentAuthor: (author: string) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  searchTerm,
  searchResult,
  setCurrentBook,
  setCurrentAuthor,
}: SearchResultProps) => {
  return (
    <>
      <div className={styles.contentBody}>
        <h2>Results for: {searchTerm}</h2>
        <BookList
          books={searchResult}
          setCurrentBook={setCurrentBook}
          setCurrentAuthor={setCurrentAuthor}
        />
      </div>
    </>
  );
};

export default SearchResult;
