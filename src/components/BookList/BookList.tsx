import { BookCard } from "../BookCard/BookCard";
import styles from "./BookList.module.css";

interface BookListProps {
  books: Book[];
  setCurrentBook: (book: Book) => void;
  setCurrentAuthor: (author: string) => void;
}

const BookList = ({
  books,
  setCurrentBook,
  setCurrentAuthor,
}: BookListProps) => {
  return (
    <div className={styles.bookList}>
      <div className={styles.bookCardContainer}>
        {books.length > 0 ? (
          books.map((book, index) => (
            <BookCard
              key={`${book.id}-${index}`}
              book={book}
              setCurrentBook={setCurrentBook}
              setCurrentAuthor={setCurrentAuthor}
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
