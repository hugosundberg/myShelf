import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "./AuthPopup.module.css";

interface AuthPopupProps {
  isOpen: boolean;
  onCancel: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onCancel }) => {
  if (!isOpen) return;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.divHeader}>
          <h2>Please log in</h2>
          <AiOutlineCloseCircle
            className={styles.closeButton}
            onClick={onCancel}
          />
        </div>

        <p>Adding, rating and reviewing books requires logging in. </p>
        <div className={styles.buttons}>
          <button onClick={onCancel}>Cancel</button>
          <button>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
