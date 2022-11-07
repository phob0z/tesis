import React from "react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Background from "../Background";

const AuthTemplate = () => {
  return (
    <Fragment>
      <Background />
      <Outlet />
    </Fragment>
  );
};

export default AuthTemplate;
