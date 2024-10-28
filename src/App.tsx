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

const App: React.FC = () => {
  const [bookSearchResult, setBookSearchResult] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      console.log(searchQuery);
    }
  }, [searchQuery]);

  const handleSetSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

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
        <Route
          path="/search"
          element={
            <SearchResult
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
