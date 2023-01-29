import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import React from "react";
import styles from "./ShowStatus.module.scss";
const ShowStatus = ({ status = 0 }) => {
  return (
    <div className={styles.root}>
      {status === 0 ? <IndeterminateCheckBoxOutlinedIcon color="error" /> : <CheckBoxOutlinedIcon color="success" />}
    </div>
  );
};

export default ShowStatus;
