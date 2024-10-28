import { BookCard } from "../BookCard/BookCard";
import styles from "./BookList.module.css";

interface Book {
  id: string;
  title: string;
  author: string | string[];
  year: number;
  img: string;
}

interface BookListProps {
  books: Book[];
}

const BookList = ({ books }: BookListProps) => {
  return (
    <div className={styles.bookList}>
      <div className={styles.bookCardContainer}>
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};
export default BookList;
