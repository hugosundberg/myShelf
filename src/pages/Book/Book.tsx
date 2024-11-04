import { useState } from "react";
import styles from "./Book.module.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface BookProps {
  currentBook?: Book;
}

const Book: React.FC<BookProps> = ({ currentBook }: BookProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleBookLike = () => {};

  if (currentBook)
    return (
      <>
        <div className={styles.contentBody}>
          <div className={styles.bookContainer}>
            <div className={styles.infoHeader}>
              <img src={currentBook.img} alt={currentBook.title} />
              <div>
                <h2>{currentBook.title}</h2>
                <h3>{currentBook.author}</h3>
                <p>
                  <strong>Published:</strong> {currentBook.year}
                </p>
                <p>
                  <strong>Category: </strong>
                  {currentBook.category}
                </p>
                <div className={styles.likeContainer}>
                  <button
                    className={styles.likeButton}
                    onClick={() => handleBookLike()}
                  >
                    {!isLiked && <BsHeart className={styles.heart} />}
                    {isLiked && <BsHeartFill className={styles.heart} />}
                  </button>
                  <p>Add to my books</p>
                </div>
              </div>
            </div>
            <p>
              <strong>Description:</strong>
            </p>
            <p>{currentBook.description}</p>
          </div>
        </div>
      </>
    );
};

export default Book;
