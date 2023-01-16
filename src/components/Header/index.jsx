import { IconButton } from "@mui/material";
import React from "react";
import styles from "./Header.module.scss";

import LogoutIcon from "@mui/icons-material/Logout";
const Header = () => {
  return (
    <header className={styles.root}>
      <h2>Dashboard</h2>
      <IconButton color="white" sx={{ color: "#fff" }}>
        <LogoutIcon />
      </IconButton>
    </header>
  );
};

export default Header;
