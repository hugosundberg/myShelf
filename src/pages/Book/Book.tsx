import { useEffect, useState } from "react";
import styles from "./Book.module.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../utils/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import Rating from "../../components/RatingComponent/RatingComponent";

const Book: React.FC<BookProps> = ({ book }: BookProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [rating, setRating] = useState<number | null>(0);

  const handleSetRating = (number: number | null) => {
    setRating(number);
  };

  const handleRating = async (number: number | null) => {
    if (!user) return;

    handleSetRating(number);

    const userBooksRef = doc(db, "users", user.uid, "books", book.id);
    try {
      if (!isLiked) {
        await setDoc(userBooksRef, {
          title: book.title,
          author: book.author,
          img: book.img,
          category: book.category,
          description: book.description,
          rating: number,
        });
      }
    } catch (error) {
      console.error("Error setting rating: ", error);
    }
  };

  const handleBookLike = async () => {
    if (!user) return;
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

  useEffect(() => {
    if (user) checkIfBookIsLiked();
  }, [book.id]);

  const checkIfBookIsLiked = async () => {
    if (!user) return;
    const userBooksRef = doc(db, "users", user.uid, "books", book.id);

    try {
      const docSnapshot = await getDoc(userBooksRef);
      setIsLiked(docSnapshot.exists());
    } catch (error) {
      console.error("Error checking if book is liked: ", error);
    }
  };

  if (book)
    return (
      <div className={styles.contentBody}>
        <div className={styles.bookContainer}>
          <div className={styles.infoHeader}>
            <img src={book.img} alt={book.title} />
            <div>
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
              <p>
                <strong>Published:</strong> {book.year}
              </p>
              <p>
                <strong>Category: </strong>
                {book.category}
              </p>
              {!isLiked ? (
                <button className={styles.likeButton} onClick={handleBookLike}>
                  <BsHeart className={styles.heart} />
                  <p>Add to my books</p>
                </button>
              ) : (
                <button className={styles.likeButton} onClick={handleBookLike}>
                  <BsHeartFill className={styles.heartActive} />
                  <p>Remove from my collection</p>
                </button>
              )}
              <div className={styles.ratingContainer}>
                <p>
                  <strong>Your rating: </strong>
                </p>
                <Rating handleRating={handleRating} />
              </div>
            </div>
          </div>
          <p>
            <strong>Description:</strong>
          </p>
          <p>{book.description}</p>
        </div>
      </div>
    );
};

export default Book;
