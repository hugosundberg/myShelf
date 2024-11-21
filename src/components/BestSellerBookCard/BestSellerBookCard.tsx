import styles from "./BestSellerBookCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

export const BestSellerBookCard = ({
  book,
  setCurrentBook,
  setCurrentAuthor,
}: BookProps) => {
  const navigate = useNavigate();

  const handleBookClick = (book: Book) => {
    if (setCurrentBook) setCurrentBook(book);
    navigate("/book");
  };

  const handleAuthorClick = (book: Book) => {
    const author = Array.isArray(book.author) ? book.author[0] : book.author;
    setCurrentAuthor(author);
    navigate("/search");
  };

  return (
    <div className={styles.bookCard}>
      <div className={styles.imageContainer}>
        {book.img && (
          <img
            src={book.img}
            className={styles.bookImg}
            alt="book cover image"
            onClick={() => handleBookClick(book)}
          />
        )}
        {!book.img && (
          <div
            className={styles.noBookImgContainer}
            onClick={() => handleBookClick(book)}
          >
            {book.title}
          </div>
        )}
      </div>
      <div className={styles.bookCardContent}>
        <h2 onClick={() => handleBookClick(book)}>{book.title}</h2>
        <p className={styles.author} onClick={() => handleAuthorClick(book)}>
          <strong>{book.author}</strong>
        </p>
        <p>{book.category}</p>
      </div>
    </div>
  );
};
