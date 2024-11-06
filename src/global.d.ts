interface Book {
    id: string;
    title: string;
    author: string | string[];
    year: number;
    img: string;
    description?: string;
    category: string;
    rating: number;
    liked: boolean;
}

interface SearchProps {
  searchQuery: string;
  currentAuthor: string;
}

interface UserProfile {
  uid: string;
  name: string;
  email: string;
}

interface BookProps {
  book: Book;
  setCurrentBook?: (book: Book) => void;
  setCurrentAuthor: (author: string) => void;
}

interface SearchResultProps {
  searchTerm: string;
  searchResult: Book[];
  setCurrentBook: (book: Book) => void;
  setCurrentAuthor: (author: string) => void;
  loading: boolean
}
