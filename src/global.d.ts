interface Book {
    id: string;
    title: string;
    author: string | string[];
    year: number;
    img: string;
    description: string;
    category: string;
}

interface SearchProps {
  searchQuery: string;
  currentAuthor: string;
}