import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./SmallBookCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import Rating from "../../components/RatingComponent/RatingComponent";

export const SmallBookCard = ({
  book,
  setCurrentBook,
  setCurrentAuthor,
}: BookProps) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (user) checkIfBookIsLiked();
  }, [user]);

  const handleBookClick = (book: Book) => {
    setCurrentBook(book);
    navigate("/book");
  };

  const handleAuthorClick = (book: Book) => {
    const author = Array.isArray(book.author) ? book.author[0] : book.author;
    setCurrentAuthor(author);
    navigate("/search");
  };

  const handleBookLike = async () => {
    // TODO: Add popup when unauth user clicks like
    if (!user) return; // Add popup
    const userBooksRef = doc(db, "users", user.uid, "books", book.id);

    try {
      if (!isLiked) {
        await setDoc(userBooksRef, {
          title: book.title,
          author: book.author,
          img: book.img,
          category: book.category,
          description: book.description,
        });
        setIsLiked(true);
      } else {
        await deleteDoc(userBooksRef);
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error adding/removing book from Firestore: ", error);
    }
  };

  const checkIfBookIsLiked = async () => {
    // TODO: Add popup when unauth user clicks like
    if (!user) return;
    const userBooksRef = doc(db, "users", user.uid, "books", book.id);

    try {
      const docSnapshot = await getDoc(userBooksRef);
      setIsLiked(docSnapshot.exists());
    } catch (error) {
      console.error("Error checking if book is liked: ", error);
    }
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
        <div className={styles.ratingLikeContainer}>
          <Rating value={book.rating} />
          <button
            className={styles.likeButton}
            onClick={() => handleBookLike()}
          >
            {!isLiked && <BsHeart className={styles.heart} />}
            {isLiked && <BsHeartFill className={styles.heartActive} />}
          </button>
        </div>
      </div>
    </div>
  );
};