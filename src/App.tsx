import "./App.css";
import booksAPI from "./services/booksAPI";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

interface Book {
  id: string;
  title: string;
  author: string | string[];
  year: number;
  img: string;
}

const App: React.FC = () => {
  const [bookSearchResult, setBookSearchResult] = useState<Book[]>([]);
  const [isBookContainerVisible, setIsBookContainerVisible] = useState(false);

  // Handle book search
  const handleBookSearch = async () => {
    try {
      const books = await booksAPI.fetchBooks();
      setBookSearchResult(books);
      setIsBookContainerVisible(true);
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
      </Routes>
    </Router>
  );
};

export default App;
