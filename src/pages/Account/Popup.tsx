import styles from "./Popup.module.css";

interface PopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Confirm deletion?</h2>
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className={styles.buttons}>
          <button className={styles.deleteButton} onClick={onConfirm}>
            Delete Account
          </button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
