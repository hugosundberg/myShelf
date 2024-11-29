import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./MyBooks.module.css";
import { auth, db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { SmallBookCard } from "../../components/SmallBookCard/SmallBookCard";
import { CircularProgress } from "@mui/material";
import Sort from "../../components/SortComponent/Sort";
import shelf from "../../assets/shelf.webp";
import React from "react";

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
  const [sortDirection, setSortDirection] = useState<string>("");
  const [booksPerRow, setBooksPerRow] = useState(3);

  useEffect(() => {
    const updateBooksPerRow = () => {
      if (window.innerWidth > 2428) {
        setBooksPerRow(6);
      } else if (window.innerWidth > 1820) {
        setBooksPerRow(5); // Large screens
      } else if (window.innerWidth > 1455) {
        setBooksPerRow(4);
      } else if (window.innerWidth > 1091) {
        setBooksPerRow(3); // Tablets
      } else if (window.innerWidth > 727) {
        setBooksPerRow(2); // Small screens
      } else {
        setBooksPerRow(1);
      }
    };

    updateBooksPerRow(); // Set initially
    window.addEventListener("resize", updateBooksPerRow);

    return () => window.removeEventListener("resize", updateBooksPerRow);
  }, []);

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
  const sortBooks = (books: Book[], option: string, direction: string) => {
    const sortedBooks = [...books].sort((a, b) => {
      switch (option) {
        case "author":
          const authorA = Array.isArray(a.author)
            ? a.author.join(", ")
            : a.author;
          const authorB = Array.isArray(b.author)
            ? b.author.join(", ")
            : b.author;
          return authorA.localeCompare(authorB);
        case "year":
          return (a.year || 0) - (b.year || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    // Invert the sort order if direction is descending
    return direction === "desc" ? sortedBooks.reverse() : sortedBooks;
  };

  const sortedLikedBooks = sortBooks(userLikedBooks, sortOption, sortDirection);
  const sortedRatedBooks = sortBooks(userRatedBooks, sortOption, sortDirection);

  return (
    <>
      <div className={styles.contentBody}>
        <h1>My Collection</h1>
        {loading && (
          <CircularProgress
            color="inherit"
            style={{ position: "absolute", top: "250px", padding: 0 }}
          />
        )}
        {userLikedBooks.length > 0 && (
          <Sort
            setSortOption={setSortOption}
            setSortDirection={setSortDirection}
          />
        )}

        <div className={styles.collectionBody}>
          {sortedLikedBooks.length > 0 ? (
            <>
              {sortedLikedBooks.map((book, index) => {
                return (
                  <React.Fragment key={`${book.id}-${index}`}>
                    <SmallBookCard
                      book={book}
                      setCurrentBook={setCurrentBook}
                      setCurrentAuthor={setCurrentAuthor}
                    />
                    {(index + 1) % booksPerRow === 0 && (
                      <img src={shelf} className={styles.shelf} alt="" />
                    )}
                  </React.Fragment>
                );
              })}
              {sortedLikedBooks.length % 3 !== 0 && (
                <img src={shelf} className={styles.shelf} alt="" />
              )}
            </>
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
