interface Book {
    id: string;
    title: string;
    author: string | string[];
    year: number;
    img: string;
    description: string;
}

interface SearchProps {
  searchQuery: string;
}