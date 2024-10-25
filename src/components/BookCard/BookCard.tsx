import styles from "./BookCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Book {
  id: string;
  title: string;
  author: string | string[];
  year: number;
  img: string;
}

interface BookProps {
  book: Book;
  isVisible: boolean;
}

export const BookCard = ({ book, isVisible }: BookProps) => {
  if (isVisible) {
    return (
      <div className={styles.bookCard}>
        <div className={styles.imageContainer}>
          <img
            src={book.img}
            className={styles.bookImg}
            alt="book cover image"
          />
        </div>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <i className="bi bi-heart"></i>
      </div>
    );
  }
};
