import styles from "./Account.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "./Popup";
import { reauthenticateWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";

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
      const booksCollectionRef = collection(db, `users/${uid}/books`);
      const booksSnapshot = await getDocs(booksCollectionRef);

      const batch = writeBatch(db);
      booksSnapshot.forEach((bookDoc) => {
        batch.delete(bookDoc.ref);
      });

      const userDocRef = doc(db, "users", uid);
      batch.delete(userDocRef);

      await batch.commit();

      console.log("User and all associated books deleted successfully");
    } catch (error) {
      console.error("Error deleting user data", error);
    }
  };

  useEffect(() => {
    if (!user) navigate("/myShelf/login");
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
