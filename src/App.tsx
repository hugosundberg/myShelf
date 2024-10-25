import { useLayoutEffect, useState } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import booksAPI from "./services/booksAPI";
import { BookCard } from "./components/BookCard/BookCard";

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
        <h2>MyShelf</h2>
        <div className="bookCardContainer">
          <BookCard
            isVisible={isBookContainerVisible}
            book={bookSearchResult[0]}
          />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
          voluptatibus esse quas dignissimos architecto doloribus amet corrupti
          iusto dolor temporibus a fugit aperiam, autem culpa porro iure?
          Possimus, doloremque consequatur.
        </p>
        <button onClick={handleBookSearch}>TEST CALL</button>
      </div>
    </>
  );
}

export default App;
