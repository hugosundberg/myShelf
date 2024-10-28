import styles from "./Book.module.css";

interface BookProps {
  currentBook: Book;
}

const Book: React.FC<BookProps> = ({ currentBook }: BookProps) => {
  return (
    <>
      <div className={styles.contentBody}>
        <div className={styles.bookContainer}>
          <img src={currentBook.img} alt={currentBook.title} />
          <h2>{currentBook.title}</h2>
          <h3>{currentBook.author}</h3>
          <p>{currentBook.description}</p>
        </div>
      </div>
    </>
  );
};

export default Book;
