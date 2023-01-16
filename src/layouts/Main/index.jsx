import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Leads from "../../pages/Leads";
import styles from "./Main.module.scss";
const Main = () => {
  return (
    <div className={styles.root}>
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
