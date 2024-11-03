import "./App.css";
import booksAPI from "./services/booksAPI";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SearchResult from "./pages/SearchResult/SearchResult";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Book from "./pages/Book/Book";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import MyBooks from "./pages/MyBooks/MyBooks";

const App: React.FC = () => {
  const [bookSearchResult, setBookSearchResult] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBook, setCurrentBook] = useState<Book>();
  const [currentAuthor, setCurrentAuthor] = useState("");

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
    if (currentAuthor !== "") {
      handleAuthorSearch();
      setCurrentAuthor("");
    }
  }, [currentAuthor]);

  // Handle book search
  const handleBookSearch = async () => {
    setBookSearchResult([]);

    try {
      const books = await booksAPI.fetchBooks({ searchQuery });
      setBookSearchResult(books);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  const handleAuthorSearch = async () => {
    setBookSearchResult([]);

    try {
      const books = await booksAPI.fetchAuthor({ currentAuthor });
      setBookSearchResult(books);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  return (
    <Router>
      <NavigationBar
        handleSetSearchQuery={handleSetSearchQuery}
        handleBookSearch={handleBookSearch}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book currentBook={currentBook} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/my-books"
          element={
            <MyBooks
              setCurrentBook={setCurrentBook}
              setCurrentAuthor={setCurrentAuthor}
            />
          }
        />

        <Route
          path="/search"
          element={
            <SearchResult
              setCurrentBook={handleSetCurrentBook}
              setCurrentAuthor={handleSetCurrentAuthor}
              searchTerm={searchQuery}
              searchResult={bookSearchResult}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
