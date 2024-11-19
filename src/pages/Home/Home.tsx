import nytAPI from "../../services/nytAPI";
import styles from "./Home.module.css";
import { SmallBookCard } from "../../components/SmallBookCard/SmallBookCard";
import { useEffect, useState } from "react";

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
  const [bestsellers, setBestsellers] = useState<Book[]>([]);

  useEffect(() => {
    getBestsellers();
  }, [bestsellerListIndex]);

  const getBestsellers = async () => {
    try {
      const bestsellers = await nytAPI.fetchLatestBestsellers(
        bestsellerListIndex
      );
      setBestsellers(bestsellers);
      return bestsellers;
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  const getLists = async () => {
    try {
      const lists = await nytAPI.fetchBestsellersLists();
      console.log(lists);
    } catch (error) {
      console.error("Error fetching bestseller lists: ", error);
    }
  };

  return (
    <>
      <div className={styles.contentBody}>
        <button onClick={getLists}>Get Lists</button>
        <h1 className={styles.title}>New York Times Bestsellers</h1>
        <div className={styles.bookContainer}>
          {bestsellers.length > 0 &&
            bestsellers.map((book, index) => (
              <div className={styles.listItemContainer}>
                <h2 className={styles.listPosition}>{index + 1}</h2>
                <SmallBookCard
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
