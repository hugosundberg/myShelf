const API_KEY = import.meta.env.VITE_NYT_API_KEY;

const LISTS_URL =
  "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=";

const BASE_URL =
  "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=";

const fetchBestsellersLists = async () => {
  try {
    const response = await fetch(`${LISTS_URL}${API_KEY}`);

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching bestseller lists: ", error);
  }
};

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

    const topFictionBooks: Book[] = data.results.lists[0].books.map(
      (book: any) => ({
        key: book.id,
        id: book.primary_isbn10,
        title: book.title,
        author: book.author,
        img: book.book_image,
      })
    );

    const topNonFictionBooks: Book[] = data.results.lists[1].books.map(
      (book: any) => ({
        key: book.id,
        id: book.primary_isbn10,
        title: book.title,
        author: book.author,
        img: book.book_image,
      })
    );

    const topYoungAdultBooks: Book[] = data.results.lists[10].books.map(
      (book: any) => ({
        key: book.id,
        id: book.primary_isbn10,
        title: book.title,
        author: book.author,
        img: book.book_image,
      })
    );

    const topChildrenBooks: Book[] = data.results.lists[8].books.map(
      (book: any) => ({
        key: book.id,
        id: book.primary_isbn10,
        title: book.title,
        author: book.author,
        img: book.book_image,
      })
    );

    const topLifestyleBooks: Book[] = data.results.lists[13].books.map(
      (book: any) => ({
        key: book.id,
        id: book.primary_isbn10,
        title: book.title,
        author: book.author,
        img: book.book_image,
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

export default { fetchLatestBestsellers, fetchBestsellersLists };
