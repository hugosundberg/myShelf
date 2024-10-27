import { useLayoutEffect, useState } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import booksAPI from "./services/booksAPI";
import { BookCard } from "./components/BookCard/BookCard";
import BookList from "./components/BookList/BookList";

interface Book {
  id: string;
  title: string;
  author: string | string[];
  year: number;
  img: string;
}

function App() {
  const [bookSearchResult, setBookSearchResult] = useState<Book[]>([]);
  const [isBookContainerVisible, setIsBookContainerVisible] = useState(false);
  //

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
    <>
      <NavigationBar />
      <div className="contentBody">
        <BookList isVisible={isBookContainerVisible} books={bookSearchResult} />
        <button onClick={handleBookSearch}>TEST CALL</button>
      </div>
    </>
  );
}

export default App;
