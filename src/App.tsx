import "./App.css";
import booksAPI from "./services/booksAPI";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/SearchResult/SearchResult";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Book from "./pages/Book/Book";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import MyBooks from "./pages/MyBooks/MyBooks";

const App: React.FC = () => {
  const [bookSearchResult, setBookSearchResult] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bestsellerListIndex, setBestSellerListIndex] = useState(0);

  const handleSetSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  const handleSetCurrentBook = (book: Book) => {
    setCurrentBook(book);
  };

  const handleSetCurrentAuthor = (author: string) => {
    setSearchQuery(author);
    setCurrentAuthor(author);
  };

  useEffect(() => {
    setSearchQuery(currentAuthor);

    if (currentAuthor !== "") {
      handleAuthorSearch();
    }
  }, [currentAuthor]);

  useEffect(() => {
    if (!searchQuery) return; // Do not search if query is empty

    const handleBookSearch = async () => {
      setBookSearchResult([]);
      setLoading(true);

      try {
        const books = await booksAPI.fetchBooks({ searchQuery, startIndex });
        setBookSearchResult(books);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books: ", error);
        setLoading(false);
      }
    };
    handleBookSearch();
  }, [searchQuery, startIndex]);

  const handleAuthorSearch = async () => {
    setBookSearchResult([]);
    setLoading(true);

    try {
      const books = await booksAPI.fetchAuthor({ currentAuthor });
      setBookSearchResult(books);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books: ", error);
      setLoading(false);
    }
  };

  return (
    <Router>
      <NavigationBar
        handleSetSearchQuery={handleSetSearchQuery}
        setBestSellerListIndex={setBestSellerListIndex}
      />
      <Routes>
        <Route
          path="/myShelf"
          element={
            <Home
              setCurrentAuthor={setCurrentAuthor}
              setCurrentBook={setCurrentBook}
              bestsellerListIndex={bestsellerListIndex}
            />
          }
        />

        <Route
          path="/myShelf/book"
          element={
            currentBook ? (
              <Book
                book={currentBook}
                setCurrentAuthor={handleSetCurrentAuthor}
              />
            ) : (
              <p>No book selected.</p>
            )
          }
        />

        <Route path="/myShelf/login" element={<Login />} />
        <Route path="/myShelf/account" element={<Account />} />
        <Route
          path="/myShelf/my-books"
          element={
            <MyBooks
              setCurrentBook={setCurrentBook}
              setCurrentAuthor={setCurrentAuthor}
            />
          }
        />

        <Route
          path="/myShelf/search"
          element={
            <SearchResult
              setCurrentBook={handleSetCurrentBook}
              setCurrentAuthor={handleSetCurrentAuthor}
              searchTerm={searchQuery}
              searchResult={bookSearchResult}
              loading={loading}
              setStartIndex={setStartIndex}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
