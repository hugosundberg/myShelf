const API_KEY = import.meta.env.VITE_NYT_API_KEY;

const LISTS_URL =
  "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=";

const BASE_URL =
  "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=";

const fetchBestsellersLists = async () => {
  try {
    const response = await fetch(`${LISTS_URL}${API_KEY}`);

    const data = await response.json();
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
  topScienceBooks: Book[];
  topFoodFitnessBooks: Book[];
}> => {
  try {
    const response = await fetch(`${BASE_URL}${API_KEY}`);

    const data = await response.json();

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

    const topYoungAdultBooks: Book[] = data.results.lists[25].books.map(
      (book: any) => ({
        key: book.id,
        id: book.primary_isbn10,
        title: book.title,
        author: book.author,
        img: book.book_image,
      })
    );

    const topChildrenBooks: Book[] = data.results.lists[17].books.map(
      (book: any) => ({
        key: book.id,
        id: book.primary_isbn10,
        title: book.title,
        author: book.author,
        img: book.book_image,
      })
    );

    const topScienceBooks: Book[] = data.results.lists[55].books.map(
      (book: any) => ({
        key: book.id,
        id: book.primary_isbn10,
        title: book.title,
        author: book.author,
        img: book.book_image,
      })
    );

    const topFoodFitnessBooks: Book[] = data.results.lists[40].books.map(
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
      topScienceBooks,
      topFoodFitnessBooks,
    };
  } catch (error) {
    console.error("Error fetching bestsellers: ", error);
    throw error;
  }
};

export default { fetchLatestBestsellers, fetchBestsellersLists };
