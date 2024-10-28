import { BookCard } from "../BookCard/BookCard";
import styles from "./BookList.module.css";

interface BookListProps {
  books: Book[];
  setCurrentBook: (book: Book) => void;
}

const BookList = ({ books, setCurrentBook }: BookListProps) => {
  return (
    <div className={styles.bookList}>
      <div className={styles.bookCardContainer}>
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              setCurrentBook={setCurrentBook}
            />
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};
export default BookList;
