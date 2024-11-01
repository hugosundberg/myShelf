import styles from "./Account.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "./Popup";

const Account: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const onDelete = () => {
    user?.delete();
    setIsPopupVisible(false);
  };

  const onCancel = () => {
    setIsPopupVisible(false);
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
