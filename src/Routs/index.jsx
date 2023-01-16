import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { COURSES, INSTRUMENTS, ORDERS, SETTINGS } from "../helpers/constants/routs";
import Main from "../layouts/Main";
import Courses from "../pages/Courses";
import Instruments from "../pages/Instruments";
import Leads from "../pages/Leads";
import NotFound from "../pages/NotFound";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
const Routs = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Leads />} />
            <Route path={ORDERS} element={<Orders />} />
            <Route path={COURSES} element={<Courses />} />
            <Route path={INSTRUMENTS} element={<Instruments />} />
            <Route path={SETTINGS} element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routs;
