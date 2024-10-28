import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import styles from "./SearchResult.module.css";
import { useNavigate } from "react-router-dom";
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
}

const SearchResult: React.FC<SearchResultProps> = ({
  searchTerm,
  searchResult,
}: SearchResultProps) => {
  return (
    <>
      <NavigationBar />
      <div className={styles.contentBody}>
        <h2>Results for: {searchTerm}</h2>
        <BookList books={searchResult} />
      </div>
    </>
  );
};

export default SearchResult;
