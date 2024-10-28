const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const API_KEY = import.meta.env.VITE_API_KEY;

interface Book {
  id: string;
  title: string;
  author: string | string[];
  year: number;
  img: string;
  description: string;
}

const fetchBooks = async (): Promise<Book[]> => {
  const query = "1q84";

  try {
    const response = await fetch(`${BASE_URL}${query}&key=${API_KEY}`);
    const data = await response.json();

    console.log(data);

    const books: Book[] = data.items.map((book: any) => ({
      id: book.id,
      title: book.volumeInfo.title || "No title available",
      author: book.volumeInfo.authors?.join(", ") || "Unknown author",
      year: book.volumeInfo.publishedDate
        ? parseInt(book.volumeInfo.publishedDate.split("-")[0])
        : 0,
      img: book.volumeInfo.imageLinks?.thumbnail || "",
      description: book.volumeInfo.description,
    }));

    console.log(books);

    return books;
  } catch (error) {
    throw new Error("Error fetching books: ");
  }
};

export default {
  fetchBooks,
};
