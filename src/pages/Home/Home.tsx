import React from "react";
import styles from "./Home.module.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  onClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <div className={styles.contentBody}>
        <h2>Books</h2>
        <button onClick={onClick}>Search</button>
        <button onClick={() => navigate("/search")}>Go to search</button>
      </div>
    </>
  );
};

export default Home;
