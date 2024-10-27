import React from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import styles from "./Home.module.css";

const Home: React.FC = ({ onClick }: any) => {
  return (
    <>
      <NavigationBar />
      <div className={styles.contentBody}>
        <button onClick={onClick}></button>
      </div>
    </>
  );
};

export default Home;
