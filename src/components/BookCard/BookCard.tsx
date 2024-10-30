import styles from "./BookCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface BookProps {
  book: Book;
  setCurrentBook: (book: Book) => void;
  setCurrentAuthor: (author: string) => void;
}

export const BookCard = ({
  book,
  setCurrentBook,
  setCurrentAuthor,
}: BookProps) => {
  const navigate = useNavigate();

  const handleBookClick = (book: Book) => {
    setCurrentBook(book);
    navigate("/book");
  };

  const handleAuthorClick = (book: Book) => {
    const author = Array.isArray(book.author) ? book.author[0] : book.author;
    setCurrentAuthor(author);
  };

  return (
    <div className={styles.bookCard}>
      <div className={styles.imageContainer}>
        {book.img && (
          <img
            src={book.img}
            className={styles.bookImg}
            alt="book cover image"
          />
        )}
        {!book.img && (
          <div className={styles.noBookImgContainer}>{book.title}</div>
        )}
      </div>
      <div className={styles.bookCardContent}>
        <h2 onClick={() => handleBookClick(book)}>{book.title}</h2>
        <p className={styles.author} onClick={() => handleAuthorClick(book)}>
          <strong>{book.author}</strong>
        </p>
        <p>{book.category}</p>
        <p>{book.description}</p>
      </div>
      <button className={styles.likeButton} onClick={() => console.log("like")}>
        <BsHeart className={styles.heart} />
      </button>
    </div>
  );
};
