import nytAPI from "../../services/nytAPI";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { BestSellerBookCard } from "../../components/BestSellerBookCard/BestSellerBookCard";

interface HomeProps {
  setCurrentBook: (book: Book) => void;
  setCurrentAuthor: (author: string) => void;
  bestsellerListIndex: number;
}

const Home: React.FC<HomeProps> = ({
  setCurrentBook,
  setCurrentAuthor,
  bestsellerListIndex,
}: HomeProps) => {
  const [topFictionBooks, setTopFictionBooks] = useState<Book[]>([]);
  const [topNonFictionBooks, setTopNonFictionBooks] = useState<Book[]>([]);
  const [topYoungAdultBooks, setTopYoungAdultBooks] = useState<Book[]>([]);
  const [topChildrenBooks, setTopChildrenBooks] = useState<Book[]>([]);
  const [topLifestyleBooks, setTopLifestyleBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBestsellers();
  }, []);

  const getBestsellers = async () => {
    try {
      const bestsellers = await nytAPI.fetchLatestBestsellers();

      setTopFictionBooks(bestsellers.topFictionBooks);
      setTopNonFictionBooks(bestsellers.topNonFictionBooks);
      setTopYoungAdultBooks(bestsellers.topYoungAdultBooks);
      setTopChildrenBooks(bestsellers.topChildrenBooks);
      setTopLifestyleBooks(bestsellers.topLifestyleBooks);

      return bestsellers;
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  return (
    <>
      <div className={styles.contentBody}>
        <h1 className={styles.title}>New York Times Bestsellers</h1>
        <div className={styles.bookContainer}>
          {bestsellerListIndex === 0 &&
            topFictionBooks.map((book, index) => (
              <div className={styles.listItemContainer}>
                <h2 className={styles.listPosition}>{index + 1}</h2>
                <BestSellerBookCard
                  key={`${book.id}-${index}`}
                  book={book}
                  setCurrentBook={setCurrentBook}
                  setCurrentAuthor={setCurrentAuthor}
                />
              </div>
            ))}

          {bestsellerListIndex === 1 &&
            topNonFictionBooks.map((book, index) => (
              <div className={styles.listItemContainer}>
                <h2 className={styles.listPosition}>{index + 1}</h2>
                <BestSellerBookCard
                  key={`${book.id}-${index}`}
                  book={book}
                  setCurrentBook={setCurrentBook}
                  setCurrentAuthor={setCurrentAuthor}
                />
              </div>
            ))}

          {bestsellerListIndex === 25 &&
            topYoungAdultBooks.map((book, index) => (
              <div className={styles.listItemContainer}>
                <h2 className={styles.listPosition}>{index + 1}</h2>
                <BestSellerBookCard
                  key={`${book.id}-${index}`}
                  book={book}
                  setCurrentBook={setCurrentBook}
                  setCurrentAuthor={setCurrentAuthor}
                />
              </div>
            ))}

          {bestsellerListIndex === 17 &&
            topChildrenBooks.map((book, index) => (
              <div className={styles.listItemContainer}>
                <h2 className={styles.listPosition}>{index + 1}</h2>
                <BestSellerBookCard
                  key={`${book.id}-${index}`}
                  book={book}
                  setCurrentBook={setCurrentBook}
                  setCurrentAuthor={setCurrentAuthor}
                />
              </div>
            ))}

          {bestsellerListIndex === 55 &&
            topLifestyleBooks.map((book, index) => (
              <div className={styles.listItemContainer}>
                <h2 className={styles.listPosition}>{index + 1}</h2>
                <BestSellerBookCard
                  key={`${book.id}-${index}`}
                  book={book}
                  setCurrentBook={setCurrentBook}
                  setCurrentAuthor={setCurrentAuthor}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
