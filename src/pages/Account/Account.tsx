import styles from "./Account.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "./Popup";
import { reauthenticateWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

const Account: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const onDelete = async () => {
    if (user) {
      const provider = new GoogleAuthProvider();

      try {
        await reauthenticateWithPopup(user, provider);

        await deleteUserData(user.uid);

        await user.delete();

        console.log("User successfully deleted");
      } catch (error) {
        console.error("Error deleting user: ", error);
      }
    }
    setIsPopupVisible(false);
  };

  const onCancel = () => {
    setIsPopupVisible(false);
  };

  const deleteUserData = async (uid: string) => {
    try {
      // Step 1: Reference the user's books subcollection
      const booksCollectionRef = collection(db, `users/${uid}/books`);
      const booksSnapshot = await getDocs(booksCollectionRef);

      // Step 2: Batch delete each book document in the books subcollection
      const batch = writeBatch(db);
      booksSnapshot.forEach((bookDoc) => {
        batch.delete(bookDoc.ref);
      });

      const usersCollectionRef = collection(db, "users", uid);

      // Step 3: Commit the batch to delete all books
      await batch.commit();

      // Step 4: Delete the main user document
      const userDocRef = doc(db, "users", uid);
      await writeBatch(db).delete(userDocRef).commit();

      console.log("User and all associated books deleted successfully");
    } catch (error) {
      console.error("Error deleting user data", error);
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <Popup isOpen={isPopupVisible} onConfirm={onDelete} onCancel={onCancel} />
      <div className={styles.contentBody}>
        <div className={styles.userInfo}>
          <h2>My Account</h2>
          <h3 className={styles.userInfoHeader}>
            Welcome {user?.displayName}{" "}
            <img
              src={user?.photoURL || ""}
              className={styles.userAvatar}
              alt=""
            />
          </h3>
          <p>
            <strong>Email: </strong>
            {user?.email}
          </p>
          <div className={styles.userButtons}>
            <button onClick={() => auth.signOut()}>Log out</button>
            <button
              className={styles.deleteButton}
              onClick={() => {
                setIsPopupVisible(true);
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
