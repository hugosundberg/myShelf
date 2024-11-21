import nytAPI from "../../services/nytAPI";
import styles from "./Home.module.css";
import { useEffect, useRef, useState } from "react";
import { BestSellerBookCard } from "../../components/BestSellerBookCard/BestSellerBookCard";
import { CircularProgress } from "@mui/material";

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
  const [topBooks, setTopBooks] = useState<Record<string, Book[]>>({
    fiction: [],
    nonFiction: [],
    youngAdult: [],
    children: [],
    lifestyle: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  const stringFormatter = (string: string) => {
    const formattedString = string.replace(/[A-Z]/g, " $&");
    formattedString[0].toUpperCase() + formattedString.slice(1);
    return formattedString;
  };

  const categoryMap: Record<number, string> = {
    0: "fiction",
    1: "nonFiction",
    25: "youngAdult",
    17: "children",
    55: "lifestyle",
  };

  useEffect(() => {
    if (hasRun.current) return;
    getBestsellers();
    hasRun.current = true;
  }, []);

  const getBestsellers = async () => {
    setLoading(true);

    try {
      const bestsellers = await nytAPI.fetchLatestBestsellers();

      setTopBooks({
        fiction: bestsellers.topFictionBooks,
        nonFiction: bestsellers.topNonFictionBooks,
        youngAdult: bestsellers.topYoungAdultBooks,
        children: bestsellers.topChildrenBooks,
        lifestyle: bestsellers.topLifestyleBooks,
      });

      setLoading(false);
      setError(null);
    } catch (err) {
      setError("Failed to fetch bestsellers. Please try again later.");
      console.error("Error fetching books: ", err);
    }
  };

  const currentCategory = categoryMap[bestsellerListIndex];
  const booksToDisplay = topBooks[currentCategory] || [];

  return (
    <div className={styles.contentBody}>
      <h1 className={styles.title}>New York Times Bestsellers</h1>
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <CircularProgress
          color="inherit"
          style={{ position: "absolute", top: "200px", padding: 0 }}
        />
      ) : (
        <h2 className={styles.title}>
          {stringFormatter(currentCategory)} bestsellers
        </h2>
      )}
      <div className={styles.bookContainer}>
        {booksToDisplay.map((book, index) => (
          <div className={styles.listItemContainer} key={index}>
            <h2 className={styles.listPosition}>{index + 1}</h2>
            <BestSellerBookCard
              book={book}
              setCurrentBook={setCurrentBook}
              setCurrentAuthor={setCurrentAuthor}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
