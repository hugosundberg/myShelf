import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.contentBody}>
        <h2>Books</h2>
        <button onClick={() => navigate("/book")}>Go To BOOK</button>
      </div>
    </>
  );
};

export default Home;
