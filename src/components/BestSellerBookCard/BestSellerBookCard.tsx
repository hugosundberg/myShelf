import styles from "./BestSellerBookCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import booksAPI from "../../services/booksAPI";

export const BestSellerBookCard = ({
  book,
  setCurrentBook,
  setCurrentAuthor,
}: BookProps) => {
  const navigate = useNavigate();

  const handleBookClick = async (book: Book) => {
    if (book.id === "") {
      const isbn = book.isbn;

      try {
        const fetchedBook = await booksAPI.fetchVolumeByISBN({ isbn });
        if (setCurrentBook) setCurrentBook(fetchedBook);
        navigate("/myShelf/book");
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  const handleAuthorClick = (book: Book) => {
    const author = Array.isArray(book.author) ? book.author[0] : book.author;
    setCurrentAuthor(author);
    navigate("/myShelf/search");
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
