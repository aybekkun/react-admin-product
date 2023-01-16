import React from "react";
import styles from "./Sidebar.module.scss";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { COURSES, INSTRUMENTS, ORDERS, SETTINGS } from "../../helpers/constants/routs";
const Sidebar = () => {
  return (
    <aside className={styles.root}>
      <div className={styles.menu}>
        <div className={styles.top}>
          <h2>Karsoft</h2>
          <IconButton>
            <ArrowBackIosNewIcon />
          </IconButton>
        </div>
        <div className={styles.center}>
          <ul>
            <li>
              <Link to="/">
                <HomeOutlinedIcon color="action" />
                Leads
              </Link>
            </li>
            <li>
              <Link to={ORDERS}>
                <AddShoppingCartOutlinedIcon color="action" />
                Orders
              </Link>
            </li>
            <li>
              <Link to={COURSES}>
                <BookOutlinedIcon color="action" />
                Courses
              </Link>
            </li>
            <li>
              <Link to={INSTRUMENTS}>
                <HandymanOutlinedIcon color="action" />
                Instruments
              </Link>
            </li>
            <li>
              <Link to={SETTINGS}>
                <TuneOutlinedIcon color="action" />
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.bottom}>Made by Karsoft.uz</div>
      </div>
    </aside>
  );
};

export default Sidebar;
