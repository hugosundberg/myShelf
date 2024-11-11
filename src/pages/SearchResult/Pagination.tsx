import Pagination from "@mui/material/Pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const BasicPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <Pagination
        sx={{
          ".MuiPaginationItem-root": { color: "white" },
        }}
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        size="large"
      />
    </>
  );
};

export default BasicPagination;
