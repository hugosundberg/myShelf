import styles from "./Account.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { Navigate, useNavigate } from "react-router-dom";

const Account: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) return <h1>Loading...</h1>;
  if (!user) navigate("/login");
  return (
    <div className={styles.contentBody}>
      <div className={styles.userInfo}>
        <h2>Dashboard</h2>
        <h3>Welcome {user?.displayName}</h3>
        <button onClick={() => auth.signOut()}>Log out</button>
        <button>Delete Account</button>
      </div>
    </div>
  );
};

export default Account;
