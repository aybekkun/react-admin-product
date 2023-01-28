import { Pagination } from "@mui/material";
import React from "react";
import styles from "./CustomPagination.module.scss";
const CustomPagination = ({ handleChangePage, total = 0, currentPage = 1 }) => {
  const handleChange = (event, value) => {
    handleChangePage(Number(value));
  };
  return (
    <div className={styles.root}>
      <Pagination count={Math.ceil(total / 10)} color="primary" page={currentPage} onChange={handleChange} />
    </div>
  );
};

export default CustomPagination;
