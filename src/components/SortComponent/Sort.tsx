import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { RiCloseLine } from "react-icons/ri"; // Fixed the close icon import
import styles from "./Sort.module.css";
import { useState } from "react";

interface SortProps {
  setSortOption: (option: string) => void;
  setSortDirection: (direction: string) => void;
}

const Sort = ({ setSortOption, setSortDirection }: SortProps) => {
  const [activeButton, setActiveButton] = useState<string>("");
  const [sortDirection, setLocalSortDirection] = useState<string>("asc");

  const toggleButton = (button: string) => {
    if (activeButton === button) {
      // Toggle the sort direction if the same button is clicked
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setLocalSortDirection(newDirection);
      setSortDirection(newDirection);
    } else {
      // Set new active button and reset to ascending direction
      setActiveButton(button);
      setLocalSortDirection("asc");
      setSortOption(button);
      setSortDirection("asc");
    }
  };

  const resetSort = () => {
    setActiveButton("");
    setLocalSortDirection("asc");
    setSortOption("");
    setSortDirection("asc");
  };

  return (
    <div className={styles.sortContainer}>
      <p>Sort by:</p>

      <button
        className={activeButton === "author" ? styles.active : ""}
        onClick={() => toggleButton("author")}
      >
        Author{" "}
        {activeButton === "author" &&
          (sortDirection === "asc" ? <SlArrowUp /> : <SlArrowDown />)}
      </button>

      <button
        className={activeButton === "year" ? styles.active : ""}
        onClick={() => toggleButton("year")}
      >
        Year{" "}
        {activeButton === "year" &&
          (sortDirection === "asc" ? <SlArrowUp /> : <SlArrowDown />)}
      </button>

      <button
        className={activeButton === "rating" ? styles.active : ""}
        onClick={() => toggleButton("rating")}
      >
        Rating{" "}
        {activeButton === "rating" &&
          (sortDirection === "asc" ? <SlArrowUp /> : <SlArrowDown />)}
      </button>

      {activeButton && (
        <button className={styles.closeButton} onClick={resetSort}>
          Clear
          <RiCloseLine />
        </button>
      )}
    </div>
  );
};

export default Sort;
