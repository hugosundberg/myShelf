import { useEffect, useState } from "react";
import styles from "./Book.module.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../utils/firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import HalfRating from "../../components/RatingComponent/RatingComponent";
import { PiNotePencil } from "react-icons/pi";
import ReviewPopup from "./ReviewPopup";

const Book: React.FC<BookProps> = ({ book, setCurrentAuthor }: BookProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSetRating = (number: number) => {
    setRating(number);
  };

  const handleRating = async (number: number) => {
    if (!user) return;

    const userBooksRef = doc(db, "users", user.uid, "books", book.id);

    try {
      if (isLiked) {
        await updateDoc(userBooksRef, { rating: number });
      } else {
        await setDoc(userBooksRef, {
          title: book.title,
          author: book.author,
          img: book.img,
          category: book.category,
          description: book.description,
          rating: number,
          isLiked: false,
          review: review,
        });
      }
      handleSetRating(number);
    } catch (error) {
      console.error("Error setting rating: ", error);
    }
  };

  const handleReview = async (newReview: string) => {
    if (!user) {
      // Create popup to tell user to log in
      setIsReviewOpen(false);
      return;
    }

    if (review === newReview) {
      setIsReviewOpen(false);
      return;
    }

    const userBooksRef = doc(db, "users", user.uid, "books", book.id);

    try {
      if (isLiked) {
        await updateDoc(userBooksRef, { review: newReview });
        setReview(newReview);
      } else {
        await setDoc(userBooksRef, {
          title: book.title,
          author: book.author,
          img: book.img,
          category: book.category,
          description: book.description,
          rating: rating,
          isLiked: false,
          review: newReview,
        });
      }
      setReview(newReview);
      setIsReviewOpen(false);
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  useEffect(() => {
    console.log(review);
  }, [review]);

  const handleAuthorClick = () => {
    const author = Array.isArray(book.author) ? book.author[0] : book.author;
    setCurrentAuthor(author);
    navigate("/search");
  };

  const handleBookLike = async () => {
    if (!user) return;

    const userBooksRef = doc(db, "users", user.uid, "books", book.id);

    try {
      if (isLiked) {
        if (rating !== 0 || review !== "") {
          await updateDoc(userBooksRef, { isLiked: false });
        } else {
          await deleteDoc(userBooksRef);
        }
        setIsLiked(false);
      } else {
        await setDoc(userBooksRef, {
          title: book.title,
          author: book.author,
          img: book.img,
          category: book.category,
          description: book.description,
          rating: rating,
          isLiked: true,
          review: "",
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error handling book like/unlike in Firestore:", error);
    }
  };

  useEffect(() => {
    if (user) {
      checkBookData();
    }
  }, [user, book.id]);

  const checkBookData = async () => {
    if (!user) return;

    try {
      const userBookRef = doc(db, "users", user.uid, "books", book.id);
      const docSnapshot = await getDoc(userBookRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setIsLiked(data.isLiked === true);
        setRating(data.rating || 0);
        setReview(data.review || "");
      }
    } catch (error) {
      console.error("Error fetching book data: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.contentBody}>
      <div className={styles.bookContainer}>
        <div className={styles.infoHeader}>
          <img src={book.img} alt={book.title} />
          <div>
            <h2>{book.title}</h2>
            <h3 onClick={handleAuthorClick}>{book.author}</h3>
            <p>
              <strong>Published:</strong> {book.year}
            </p>
            <p>
              <strong>Category: </strong>
              {book.category}
            </p>
            <div className={styles.bookButtonsContainer}>
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
              <button
                className={styles.reviewButton}
                onClick={() => setIsReviewOpen(true)}
              >
                <PiNotePencil />
                Review
              </button>
            </div>
            <div className={styles.ratingContainer}>
              <p>
                <strong>Your rating: </strong>
              </p>
              <HalfRating handleRating={handleRating} value={rating} />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Description:</strong>
        </p>
        <p>{book.description}</p>
      </div>
      {review !== "" && (
        <div className={styles.reviewContainer}>
          <h2>Your review</h2>
          <p>{review}</p>
        </div>
      )}
      <ReviewPopup
        book={book}
        isOpen={isReviewOpen}
        review={review}
        onConfirm={(newReview) => handleReview(newReview)}
        onCancel={() => setIsReviewOpen(false)}
      />
    </div>
  );
};

export default Book;
