import styles from "./Account.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

const Account: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className={styles.contentBody}>
      <div className={styles.userInfo}>
        <h2>Dashboard</h2>
        <h3>{user?.displayName}</h3>

        <button>Log out</button>
        <button>Delete Account</button>
      </div>
    </div>
  );
};

export default Account;
