import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./SmallBookCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { doc, deleteDoc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import HalfRating from "../../components/RatingComponent/RatingComponent";

export const SmallBookCard = ({
  book,
  setCurrentBook,
  setCurrentAuthor,
}: BookProps) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (user) checkIfBookIsLiked();
  }, [user]);

  const handleBookClick = (book: Book) => {
    if (setCurrentBook) setCurrentBook(book);

    navigate(`/book/${book.id}`);
  };

  const handleAuthorClick = (book: Book) => {
    const author = Array.isArray(book.author) ? book.author[0] : book.author;
    setCurrentAuthor(author);
    navigate("/search");
  };

  const handleBookLike = async () => {
    if (!user) return;

    const userBooksRef = doc(db, "users", user.uid, "books", book.id);

    try {
      const docSnapshot = await getDoc(userBooksRef);

      if (docSnapshot.exists()) {
        if (isLiked) {
          if (book.rating !== 0) {
            await updateDoc(userBooksRef, { isLiked: false });
          } else {
            await deleteDoc(userBooksRef);
          }
          setIsLiked(false);
        } else {
          await updateDoc(userBooksRef, { isLiked: true });
          setIsLiked(true);
        }
      } else {
        await setDoc(userBooksRef, {
          title: book.title,
          author: book.author,
          img: book.img,
          category: book.category,
          description: book.description,
          rating: book.rating || 0,
          isLiked: true,
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error handling book like/unlike in Firestore:", error);
    }
  };

  const checkIfBookIsLiked = async () => {
    if (!user) return;

    try {
      const userBookRef = doc(db, "users", user.uid, "books", book.id);
      const docSnapshot = await getDoc(userBookRef);

      // Check if the document exists and has isLiked set to true
      if (docSnapshot.exists() && docSnapshot.data().isLiked === true) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
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
        <p>
          <strong>Published: </strong>
          {book.year}
        </p>
        <p>{book.category}</p>
        <div className={styles.ratingLikeContainer}>
          <HalfRating value={book.rating} />
          <button
            className={styles.likeButton}
            onClick={() => handleBookLike()}
          >
            {!isLiked ? (
              <BsHeart className={styles.heart} />
            ) : (
              <BsHeartFill className={styles.heartActive} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
