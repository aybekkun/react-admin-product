import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { COURSES, INSTRUMENTS, ORDERS, SETTINGS, SUPPORT } from "../helpers/constants/routs";
import AuthLayout from "../layouts/AuthLayout";
import Main from "../layouts/Main";
import Courses from "../pages/Courses";
import Instruments from "../pages/Instruments";
import Leads from "../pages/Leads";
import NotFound from "../pages/NotFound";
import Orders from "../pages/Orders";
import PublicForm from "../pages/PublicForm";
import Settings from "../pages/Settings";
import Support from "../pages/Support";
import ProtectedRoute from "./ProtectedRoute";
const Routs = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          >
            <Route index element={<Leads />} />
            <Route path={ORDERS} element={<Orders />} />
            <Route path={COURSES} element={<Courses />} />
            <Route path={INSTRUMENTS} element={<Instruments />} />
            <Route path={SETTINGS} element={<Settings />} />
            <Route path={SUPPORT} element={<Support />} />

            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/form" element={<PublicForm />} />
          <Route path="/login" element={<AuthLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routs;
