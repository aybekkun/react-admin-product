import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Leads from "../../pages/Leads";
import { setActive } from "../../redux/effect/slice";
import styles from "./Main.module.scss";
const Main = () => {
  const { active } = useSelector((state) => state.effect);

  return (
    <div className={active ? `${styles.root} ${styles.active}` : `${styles.root}`}>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Main;
