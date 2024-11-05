import React from "react";
import styles from "./SearchResult.module.css";
import BookList from "../../components/BookList/BookList";
import { CircularProgress } from "@mui/material";

const SearchResult: React.FC<SearchResultProps> = ({
  searchTerm,
  searchResult,
  setCurrentBook,
  setCurrentAuthor,
  loading,
}: SearchResultProps) => {
  const displayTerm = searchTerm;
  return (
    <>
      <div className={styles.contentBody}>
        <h2>Results for: {displayTerm}</h2>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <BookList
            books={searchResult}
            setCurrentBook={setCurrentBook}
            setCurrentAuthor={setCurrentAuthor}
          />
        )}
      </div>
    </>
  );
};

export default SearchResult;
