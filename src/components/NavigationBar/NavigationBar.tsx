import { useNavigate } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import { useState, ChangeEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

interface NavigationBarProps {
  handleSetSearchQuery: (query: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  handleSetSearchQuery,
}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (!input) return;
    handleSetSearchQuery(input);
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.upperNav}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <PiBooksLight className={styles.logo} />
          <h2>MyShelf</h2>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Books, authors, etc."
            aria-label="Search for books or authors"
            value={input}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input) {
                handleSearch();
              }
            }}
            className={styles.searchBar}
          />
          <IoSearchOutline
            className={styles.searchIcon}
            onClick={handleSearch}
          />
        </div>
        <div className={styles.navMenu}>
          {!user ? (
            <button onClick={() => navigate("/login")}>Sign In</button>
          ) : (
            <>
              <button onClick={() => navigate("/my-books")}>My Books</button>
              <button onClick={() => navigate("/account")}>
                Account
                <img
                  src={user.photoURL || ""}
                  alt="User Avatar"
                  className={styles.userAvatar}
                />
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.lowerNav}>
        <ul>
          <li>Books</li>
          <li>Bestsellers</li>
          <li>Fiction</li>
          <li>Non-Fiction</li>
          <li>Children</li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
