import { IconButton } from "@mui/material";
import React from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../redux/effect/slice";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/auth/slice";
const Header = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.effect);

  const onChangeActive = () => {
    dispatch(setActive(false));
  };

  const onLogout = () => {
    if (window.confirm("Sign out of account")) dispatch(logout());
  };
  return (
    <header className={active ? `${styles.root} ${styles.active}` : `${styles.root}`}>
      <h2>
        {active && (
          <IconButton onClick={onChangeActive}>
            <ArrowForwardIosOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        )}
        Dashboard
      </h2>
      <IconButton onClick={onLogout} color="white" sx={{ color: "#fff" }}>
        <LogoutIcon />
      </IconButton>
    </header>
  );
};

export default Header;
