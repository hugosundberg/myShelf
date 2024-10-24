import { useLayoutEffect } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import booksAPI from "./services/booksAPI";

function App() {
  //

  // Handle book search
  const handleBookSearch = async () => {
    try {
      const response = await booksAPI.fetchBooks();
      console.log(response);

      console.log({process.env.REACT_APP_API_KEY});
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="contentBody">
        <h2>MyShelf</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
          voluptatibus esse quas dignissimos architecto doloribus amet corrupti
          iusto dolor temporibus a fugit aperiam, autem culpa porro iure?
          Possimus, doloremque consequatur.
        </p>
        <button onClick={handleBookSearch}>TEST CALL</button>
      </div>
    </>
  );
}

export default App;
