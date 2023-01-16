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
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../redux/effect/slice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.effect);

  const onChangeActive = () => {
    dispatch(setActive(true));
  };
  return (
    <aside className={active ? `${styles.root} ${styles.active}` : `${styles.root}`}>
      <div className={styles.menu}>
        <div className={styles.top}>
          <h2>Karsoft</h2>
          <IconButton onClick={onChangeActive}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </div>
        <div className={styles.center}>
          <ul>
            <li>
              <Link to="/">
                <HomeOutlinedIcon color="action"  />
                <span>Leads</span>
              </Link>
            </li>
            <li>
              <Link to={ORDERS}>
                <AddShoppingCartOutlinedIcon color="action" />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to={COURSES}>
                <BookOutlinedIcon color="action" />
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link to={INSTRUMENTS}>
                <HandymanOutlinedIcon color="action" />
                <span>Instruments</span>
              </Link>
            </li>
            <li>
              <Link to={SETTINGS}>
                <TuneOutlinedIcon color="action" />
                <span>Settings</span>
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
