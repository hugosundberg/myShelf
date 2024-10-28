import "./App.css";
import booksAPI from "./services/booksAPI";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SearchResult from "./pages/SearchResult/SearchResult";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Book from "./pages/Book/Book";

const App: React.FC = () => {
  const [bookSearchResult, setBookSearchResult] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBook, setCurrentBook] = useState<Book>();

  const handleSetSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  const handleSetCurrentBook = (book: Book) => {
    setCurrentBook(book);
    console.log(currentBook);
  };

  useEffect(() => {
    console.log(currentBook);
  }, [currentBook]);

  // Handle book search
  const handleBookSearch = async () => {
    try {
      const books = await booksAPI.fetchBooks({ searchQuery });
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

        <Route
          path="/search"
          element={
            <SearchResult
              setCurrentBook={handleSetCurrentBook}
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
