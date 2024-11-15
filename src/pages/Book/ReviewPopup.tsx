import styles from "./ReviewPopup.module.css";

interface PopupProps {
  book: Book;
  isOpen: boolean;
  onConfirm: (review: string) => void;
  onCancel: () => void;
  review: string;
}

const ReviewPopup: React.FC<PopupProps> = ({
  book,
  isOpen,
  onConfirm,
  onCancel,
  review,
}) => {
  if (!isOpen) return null;

  let reviewContent = review;

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    reviewContent = event.target.value;
  };

  const handleSave = () => {
    onConfirm(reviewContent);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>{book.title}</h2>
        <textarea
          className={styles.reviewTextArea}
          name="review"
          id="review"
          placeholder="Write a review..."
          onChange={handleInputChange}
          defaultValue={reviewContent}
        ></textarea>
        <div className={styles.buttons}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Review
          </button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
