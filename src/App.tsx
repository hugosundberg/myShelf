import "./App.css";
import booksAPI from "./services/booksAPI";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SearchResult from "./pages/SearchResult/SearchResult";

interface Book {
  id: string;
  title: string;
  author: string | string[];
  year: number;
  img: string;
  description: string;
}

const App: React.FC = () => {
  const [bookSearchResult, setBookSearchResult] = useState<Book[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  // Handle book search
  const handleBookSearch = async () => {
    try {
      const books = await booksAPI.fetchBooks();
      setBookSearchResult(books);

      console.log(searchQuery + ": ");
      console.log(bookSearchResult);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onClick={handleBookSearch} />} />
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
