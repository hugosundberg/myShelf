import { useNavigate } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import { useState, ChangeEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

interface NavigationBarProps {
  handleSetSearchQuery: (query: string) => void;
  setBestSellerListIndex: (number: number) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  handleSetSearchQuery,
  setBestSellerListIndex,
}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (!input) return;
    handleSetSearchQuery(input);
    navigate("/search");
  };

  const handleCategoryClick = (number: number) => {
    setBestSellerListIndex(number);
    navigate("/");
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.upperNav}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <PiBooksLight className={styles.logo} />
          <h2 className={styles.title}>MyShelf</h2>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Books, authors..."
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
            <button
              className={styles.signInButton}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          ) : (
            <>
              <button
                className={styles.myBooksButton}
                onClick={() => navigate("/my-books")}
              >
                My Books
              </button>
              <button
                className={styles.myAccountButton}
                onClick={() => navigate("/account")}
              >
                <span className={styles.accountButtonText}>Account</span>
                <img
                  src={user.photoURL || ""}
                  alt="User Avatar"
                  className={styles.userAvatar}
                />
              </button>
              <div
                className={`${styles.hamburger} ${
                  isMenuOpen ? styles.open : ""
                }`}
                onClick={toggleMenu}
              >
                {/* Hamburger Icon */}
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
              </div>

              <div
                className={`${styles.dropdownMenu} ${
                  isMenuOpen ? styles.visible : styles.hidden
                }`}
              >
                {!user ? (
                  <button onClick={() => navigate("/login")}>Sign In</button>
                ) : (
                  <div className={styles.dropDownButtons}>
                    <button
                      className={styles.dropdownMyBooks}
                      onClick={() => navigate("/my-books")}
                    >
                      My Books
                    </button>
                    <button
                      className={styles.dropdownAccount}
                      onClick={() => navigate("/account")}
                    >
                      Account
                      <img
                        src={user.photoURL || ""}
                        alt="User Avatar"
                        className={styles.userAvatar}
                      />
                    </button>
                  </div>
                )}

                <ul>
                  <li onClick={() => navigate("/category/fiction")}>Fiction</li>
                  <li onClick={() => navigate("/category/non-fiction")}>
                    Non-Fiction
                  </li>
                  <li onClick={() => navigate("/category/young-adult")}>
                    Young Adult
                  </li>
                  <li onClick={() => navigate("/category/children")}>
                    Children
                  </li>
                  <li onClick={() => navigate("/category/lifestyle")}>
                    Lifestyle
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.lowerNav}>
        <ul>
          <li onClick={() => handleCategoryClick(0)}>Fiction</li>
          <li onClick={() => handleCategoryClick(1)}>Non-Fiction</li>
          <li onClick={() => handleCategoryClick(25)}>Young Adult</li>
          <li onClick={() => handleCategoryClick(17)}>Children</li>
          <li onClick={() => handleCategoryClick(55)}>Lifestyle</li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
