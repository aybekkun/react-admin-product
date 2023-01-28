import { Paper } from "@mui/material";
import React from "react";
import styles from "./Support.module.scss";
const Support = () => {

  return (
    <div className={styles.root}>
      <Paper>
        <div className={styles.box}></div>
      </Paper>

      <Paper>
        <div className={styles.box}></div>
      </Paper>
    </div>
  );
};

export default Support;
