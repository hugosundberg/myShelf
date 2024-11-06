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
        // Use a query constraint to only get books where isLiked is true
        const booksCollectionRef = collection(db, "users", user.uid, "books");
        const likedBooksQuery = query(
          booksCollectionRef,
          where("isLiked", "==", true)
        );
        const ratedBooksQuery = query(
          booksCollectionRef,
          where("isLiked", "==", false)
        );

        const likedQuerySnapshot = await getDocs(likedBooksQuery);
        const ratedQuerySnapshot = await getDocs(ratedBooksQuery);

        const userLikedBooks: Book[] = likedQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];

        const userRatedBooks: Book[] = ratedQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];

        setUserLikedBooks(userLikedBooks);
        setUserRatedBooks(userRatedBooks);
      } catch (error) {
        console.error("Error fetching user books", error);
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
          <div>
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
