import styles from "./AuthPopup.module.css";

const AuthPopup = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Please log in</h2>
        <p>Adding, rating and reviewing books requires logging in. </p>
        <div className={styles.buttons}>
          <button>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
