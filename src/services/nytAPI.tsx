import { log } from "console";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;

const BASE_URL =
  "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=";

const fetchLatestBestsellers = async (): Promise<{
  topFictionBooks: Book[];
  topNonFictionBooks: Book[];
  topYoungAdultBooks: Book[];
  topChildrenBooks: Book[];
  topLifestyleBooks: Book[];
}> => {
  try {
    const response = await fetch(`${BASE_URL}${API_KEY}`);

    const data = await response.json();

    console.log(data);

    console.log(data.results.lists[6].books);
    
    

    const topFictionBooks: Book[] = data.results.lists[0].books.map(
      (book: any) => ({
        id: "",
        title: book.title,
        author: book.author,
        img: book.book_image,
        isbn: book.primary_isbn13,
      })
    );

    const topNonFictionBooks: Book[] = data.results.lists[1].books.map(
      (book: any) => ({
        id: "",
        title: book.title,
        author: book.author,
        img: book.book_image,
        isbn: book.primary_isbn13,
      })
    );

    const topYoungAdultBooks: Book[] = data.results.lists[10].books.map(
      (book: any) => ({
        id: "",
        title: book.title,
        author: book.author,
        img: book.book_image,
        isbn: book.primary_isbn13,
      })
    );

    const topChildrenBooks: Book[] = data.results.lists[8].books.map(
      (book: any) => ({
        id: "",
        title: book.title,
        author: book.author,
        img: book.book_image,
        isbn: book.primary_isbn13,
      })
    );

    const topLifestyleBooks: Book[] = data.results.lists[6].books.map(
      (book: any) => ({
        id: "",
        title: book.title,
        author: book.author,
        img: book.book_image,
        isbn: book.primary_isbn13,
      })
    );

    return {
      topFictionBooks,
      topNonFictionBooks,
      topYoungAdultBooks,
      topChildrenBooks,
      topLifestyleBooks,
    };
  } catch (error) {
    console.error("Error fetching bestsellers: ", error);
    throw error;
  }
};

export default { fetchLatestBestsellers };
