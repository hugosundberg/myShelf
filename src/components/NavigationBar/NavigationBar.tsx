import { useNavigate } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import { useState, ChangeEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";

interface NavigationBarProps {
  handleSetSearchQuery: (query: string) => void;
  handleBookSearch: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  handleSetSearchQuery,
  handleBookSearch,
}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    handleSetSearchQuery(value);
  };

  const handleSearch = () => {
    handleBookSearch();
    navigate("/search");
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.logoContainer}>
        <PiBooksLight className={styles.logo} />
        <h2 onClick={() => navigate("/")}>MyShelf</h2>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Books, authors, etc."
          value={input}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input) {
              handleSearch();
            }
          }}
          className={styles.searchBar}
        ></input>
        <IoSearchOutline className={styles.searchIcon} onClick={handleSearch} />
      </div>
      <div className={styles.navMenu}>
        <button>My Books</button>
        <button onClick={() => navigate("/login")}>Account</button>
      </div>
    </div>
  );
};

export default NavigationBar;
