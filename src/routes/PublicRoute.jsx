import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

const PublicRoute = () => {
  const { logged } = useContext(AuthContext);
  return logged ? (
    <Navigate to="/" />
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/*" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PublicRoute;
