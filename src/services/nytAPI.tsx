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

const fetchLatestBestsellers = async (listIndex: number): Promise<Book[]> => {
  console.log(listIndex);

  try {
    const response = await fetch(`${BASE_URL}${API_KEY}`);

    const data = await response.json();

    const books: Book[] = data.results.lists[listIndex].books.map(
      (book: any) => ({
        key: listIndex,
        id: book.primary_isbn10,
        title: book.title,
        author: book.author,
        img: book.book_image,
      })
    );

    console.log(books);

    return books;
  } catch (error) {
    console.error("Error fetching bestsellers: ", error);
    return [];
  }
};

export default { fetchLatestBestsellers, fetchBestsellersLists };
