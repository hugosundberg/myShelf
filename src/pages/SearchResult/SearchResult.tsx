import React from "react";
import styles from "./SearchResult.module.css";
import BookList from "../../components/BookList/BookList";

interface Book {
  id: string;
  title: string;
  author: string | string[];
  year: number;
  img: string;
  description: string;
}

interface SearchResultProps {
  searchTerm: string;
  searchResult: Book[];
  setCurrentBook: (book: Book) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  searchTerm,
  searchResult,
  setCurrentBook,
}: SearchResultProps) => {
  return (
    <>
      <div className={styles.contentBody}>
        <h2>Results for: {searchTerm}</h2>
        <BookList books={searchResult} setCurrentBook={setCurrentBook} />
      </div>
    </>
  );
};

export default SearchResult;
