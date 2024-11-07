import { useEffect, useState } from "react";
import styles from "./Book.module.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../utils/firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Rating from "../../components/RatingComponent/RatingComponent";
import { useNavigate } from "react-router-dom";

const Book: React.FC<BookProps> = ({ book, setCurrentAuthor }: BookProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [rating, setRating] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSetRating = (number: number | null) => {
    setRating(number);
  };

  const handleRating = async (number: number | null) => {
    if (!user || number === null) return;

    if (book.rating === number) {
      handleSetRating(0);
    } else {
      handleSetRating(number);
    }

    const userBooksRef = doc(db, "users", user.uid, "books", book.id);
    try {
      if (isLiked) {
        await setDoc(userBooksRef, {
          title: book.title,
          author: book.author,
          img: book.img,
          category: book.category,
          description: book.description,
          rating: number,
          isLiked: true,
        });
      } else {
        await setDoc(userBooksRef, {
          title: book.title,
          author: book.author,
          img: book.img,
          category: book.category,
          description: book.description,
          rating: number,
          isLiked: false,
        });
      }
    } catch (error) {
      console.error("Error setting rating: ", error);
    }
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

  useEffect(() => {
    if (user) {
      checkIfBookIsLiked();
    }
  }, [user, book.id]);

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

    console.log(isLiked);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.contentBody}>
      <div className={styles.bookContainer}>
        <div className={styles.infoHeader}>
          <img src={book.img} alt={book.title} />
          <div>
            <h2>{book.title}</h2>
            <h3 onClick={() => handleAuthorClick(book)}>{book.author}</h3>
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
              <Rating handleRating={handleRating} value={book.rating} />
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
