import { useNavigate } from "react-router-dom";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navBar}>
      <h2 onClick={() => navigate("/")}>MyShelf</h2>
      <input type="text" className={styles.searchBar} />
      <div className={styles.navMenu}>
        <button>My Books</button>
        <button>Account</button>
      </div>
    </div>
  );
};

export default NavigationBar;
