import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import AuthProvider from "../contexts/auth/AuthProvider";

import Background from "../components/background/Background";
import Spinner from "../components/spinner/Spinner";
import Modal from "../components/modal/Modal";
import Privacy from "../pages/policy/Privacy";

const AppRouter = () => {
  return (
    <div className="bodyWrapper">
      <Background />
      <Spinner />
      <Modal />
      <AuthProvider>
        <Routes>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="login/*" element={<PublicRoute />} />
          <Route path="/*" element={<PrivateRoute />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default AppRouter;
