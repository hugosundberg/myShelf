import React from "react";
import styles from "./SearchResult.module.css";
import BookList from "../../components/BookList/BookList";
import { CircularProgress } from "@mui/material";
import Pagination from "./Pagination";

const SearchResult: React.FC<SearchResultProps> = ({
  searchTerm,
  searchResult,
  setCurrentBook,
  setCurrentAuthor,
  loading,
  setStartIndex,
  currentPage,
  setCurrentPage,
}: SearchResultProps) => {
  const displayTerm = searchTerm;
  const totalPages = 10;

  const handlePageChange = async (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    if (value === 1) {
      setStartIndex(0);
    } else {
      setStartIndex((value - 1) * 20);
    }
  };

  return (
    <>
      <div className={styles.contentBody}>
        <h2>Results for: {displayTerm}</h2>
        {searchResult.length > 0 && (
          <div className={styles.pagination}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {loading ? (
          <>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <CircularProgress
              color="inherit"
              style={{ position: "absolute", top: "200px", padding: 0 }}
            />
          </>
        ) : (
          <>
            <BookList
              books={searchResult}
              setCurrentBook={setCurrentBook}
              setCurrentAuthor={setCurrentAuthor}
              setStartIndex={setStartIndex}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        )}

        {searchResult.length > 0 && (
          <div className={styles.pagination}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResult;
