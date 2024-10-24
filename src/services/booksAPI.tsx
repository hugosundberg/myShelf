const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

interface Book {
  id: string;
  name: string;
  author: string;
  year: number;
  img: string;
}

const fetchBooks = async () => {
  const query = "1q84";

  try {
    const response = await fetch(BASE_URL + query);
    const data = await response.json();

    const artist;
  } catch (error) {
    throw new Error("Error fetching books");
  }
};

export default {
  fetchBooks,
};
