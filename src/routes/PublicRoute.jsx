import React, { Fragment, useContext } from "react";
import { Navigate } from "react-router-dom";
import Background from "../components/Background";
import AuthContext from "../contexts/auth/AuthContext";

const PublicRoute = (props) => {
  const { logged } = useContext(AuthContext);
  return !logged ? (
    <Fragment>
      <Background />
      {props.children}
    </Fragment>
  ) : (
    <Navigate to="/" />
  );
};

export default PublicRoute;
