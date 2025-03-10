interface Book {
    id: string;
    title: string;
    author: string | string[];
    year: number;
    img: string;
    description?: string;
    category: string;
    rating: number;
    isLiked: boolean;
    isbn: number;
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
  loading: boolean;
  setStartIndex: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}
