import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./MyBooks.module.css";
import { auth, db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { BookCard } from "../../components/BookCard/BookCard";

const MyBooks: React.FC = ({ setCurrentAuthor, setCurrentBook }) => {
  const [user, loading] = useAuthState(auth);
  const [userBooks, setUserBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!user) return;

      try {
        const booksCollectionRef = collection(db, "users", user.uid, "books");
        const querySnapshot = await getDocs(booksCollectionRef);

        const userBooks: Book[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];

        setUserBooks(userBooks);
      } catch (error) {
        console.error("Error fetching user books", error);
      }
    };

    fetchUserBooks();
  }, [user]);

  if (user) {
    console.log(userBooks);
  }

  return (
    <>
      <div className={styles.contentBody}>
        <div className={styles.collectionBody}>
          <h1>My Collection</h1>
          {!userBooks && (
            <h3>
              You have no saved books. Try searching for one of your favorites!
            </h3>
          )}

          {userBooks &&
            userBooks.map((book, index) => (
              <BookCard
                key={`${book.id}-${index}`}
                book={book}
                setCurrentBook={setCurrentBook}
                setCurrentAuthor={setCurrentAuthor}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default MyBooks;
