import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <div className={styles.navBar}>
      <h2>MyShelf</h2>
      <input type="text" className={styles.searchBar} />
      <div className={styles.navMenu}>
        <button>My Books</button>
        <button>Account</button>
      </div>
    </div>
  );
};

export default NavigationBar;
