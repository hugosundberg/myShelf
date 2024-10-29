import { useEffect } from "react";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchBooks = async ({
  searchQuery,
}: {
  searchQuery: string;
}): Promise<Book[]> => {
  try {
    const response = await fetch(`${BASE_URL}${searchQuery}&key=${API_KEY}`);
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

const fetchAuthor = async ({
  currentAuthor,
}: {
  currentAuthor: string;
}): Promise<Book[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}inauthor:${encodeURIComponent(currentAuthor)}&key=${API_KEY}`
    );
    const data = await response.json();

    const books: Book[] =
      data.items?.map((book: any) => ({
        id: book.id,
        title: book.volumeInfo.title || "No title available",
        author: book.volumeInfo.authors?.join(", ") || "Unknown author",
        year: book.volumeInfo.publishedDate
          ? parseInt(book.volumeInfo.publishedDate.split("-")[0])
          : 0,
        img: book.volumeInfo.imageLinks?.thumbnail || "",
        description: book.volumeInfo.description || "No description available",
      })) || [];

    return books;
  } catch (error) {
    console.error("Error fetching books by author:", error);
    return [];
  }
};

export default {
  fetchBooks,
  fetchAuthor,
};
