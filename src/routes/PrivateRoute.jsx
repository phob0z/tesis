import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";

const PrivateRoute = (props) => {
  const { logged } = useContext(AuthContext);
  return logged ? props.children : <Navigate to="/login" />;
};

export default PrivateRoute;
