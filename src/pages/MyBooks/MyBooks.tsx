import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./MyBooks.module.css";
import { auth, db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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

  return (
    <>
      <div className={styles.contentBody}>
        {userLikedBooks.length > 0 ? (
          <h1>My Collection</h1>
        ) : (
          <h3>
            You have no saved books. Try searching for one of your favorites!
          </h3>
        )}
        <div className={styles.collectionBody}>
          {userLikedBooks &&
            userLikedBooks.map((book, index) => (
              <SmallBookCard
                key={`${book.id}-${index}`}
                book={book}
                setCurrentBook={setCurrentBook}
                setCurrentAuthor={setCurrentAuthor}
              />
            ))}
        </div>
        {userRatedBooks.length > 0 ? (
          <div className={styles.ratedBooks}>
            <h2>Rated Books</h2>

            {userRatedBooks &&
              userRatedBooks.map((book, index) => (
                <SmallBookCard
                  key={`${book.id}-${index}`}
                  book={book}
                  setCurrentBook={setCurrentBook}
                  setCurrentAuthor={setCurrentAuthor}
                />
              ))}
          </div>
        ) : (
          <h3>No books rated</h3>
        )}
      </div>
    </>
  );
};

export default MyBooks;
