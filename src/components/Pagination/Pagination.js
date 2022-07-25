import { Pagination } from "@mui/material";

const CustomPagination = ({ pages, handleChange }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <Pagination
        count={pages}
        color="primary"
        onChange={(_, value) => handleChange(value)}
      />
    </div>
  );
};

export default CustomPagination;
