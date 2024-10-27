import styles from "./BookCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

interface Book {
  id: string;
  title: string;
  author: string | string[];
  year: number;
  img: string;
}

interface BookProps {
  book: Book;
}

const fill = () => {};

export const BookCard = ({ book }: BookProps) => {
  return (
    <div className={styles.bookCard}>
      <div className={styles.imageContainer}>
        <img src={book.img} className={styles.bookImg} alt="book cover image" />
      </div>
      <div className={styles.bookCardContent}>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <button className={styles.likeButton} onClick={fill}>
          <BsHeart className={styles.heart} />
        </button>
      </div>
    </div>
  );
};
