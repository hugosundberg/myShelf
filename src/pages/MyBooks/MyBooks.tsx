import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./MyBooks.module.css";
import { auth, db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { SmallBookCard } from "../../components/SmallBookCard/SmallBookCard";
import { CircularProgress } from "@mui/material";

interface MyBooksProps {
  setCurrentBook: (book: Book) => void;
  setCurrentAuthor: (author: string) => void;
}

const MyBooks: React.FC<MyBooksProps> = ({
  setCurrentAuthor,
  setCurrentBook,
}) => {
  const [user] = useAuthState(auth);
  const [userLikedBooks, setUserLikedBooks] = useState<Book[]>([]);
  const [userRatedBooks, setUserRatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState<string>(""); // Sort state

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!user) return;

      setLoading(true);

      try {
        const booksCollectionsRef = collection(db, "users", user.uid, "books");

        const querySnapshot = await getDocs(booksCollectionsRef);

        const allBooks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];

        const likedBooks = allBooks.filter((book) => book.isLiked === true);
        const ratedBooks = allBooks.filter(
          (book) => book.isLiked === false && book.rating !== undefined
        );

        setUserLikedBooks(likedBooks);
        setUserRatedBooks(ratedBooks);
      } catch (error) {
        console.error("Error fetching books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBooks();
  }, [user]);

  // Sorting function based on selected option
  const sortBooks = (books: Book[], option: string) => {
    switch (option) {
      case "author":
        return [...books].sort((a, b) => {
          const authorA = Array.isArray(a.author)
            ? a.author.join(", ")
            : a.author;
          const authorB = Array.isArray(b.author)
            ? b.author.join(", ")
            : b.author;
          return authorA.localeCompare(authorB);
        });
      case "year":
        return [...books].sort((a, b) => (a.year || 0) - (b.year || 0));
      case "rating":
        return [...books].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return books;
    }
  };

  const sortedLikedBooks = sortBooks(userLikedBooks, sortOption);
  const sortedRatedBooks = sortBooks(userRatedBooks, sortOption);

  return (
    <>
      <div className={styles.contentBody}>
        <h1>My Collection</h1>
        {loading && (
          <CircularProgress
            color="inherit"
            style={{ position: "absolute", top: "200px", padding: 0 }}
          />
        )}
        <div className={styles.sortContainer}>
          <button onClick={() => setSortOption("author")}>Author</button>
          <button onClick={() => setSortOption("year")}>Year</button>
          <button onClick={() => setSortOption("rating")}>Rating</button>
        </div>
        <div className={styles.collectionBody}>
          {sortedLikedBooks.length > 0 ? (
            sortedLikedBooks.map((book, index) => (
              <SmallBookCard
                key={`${book.id}-${index}`}
                book={book}
                setCurrentBook={setCurrentBook}
                setCurrentAuthor={setCurrentAuthor}
              />
            ))
          ) : (
            <h3>
              You have no saved books. Try searching for one of your favorites!
            </h3>
          )}
        </div>
        {sortedRatedBooks.length > 0 && (
          <>
            <h2>Not in your collection</h2>
            <div className={styles.ratedBooks}>
              {sortedRatedBooks.map((book, index) => (
                <SmallBookCard
                  key={`${book.id}-${index}`}
                  book={book}
                  setCurrentBook={setCurrentBook}
                  setCurrentAuthor={setCurrentAuthor}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyBooks;
