import React, { Fragment, useContext } from "react";
import Card from "../components/atoms/Card";
import MainContainer from "../components/atoms/MainContainer";
import AuthContext from "../contexts/auth/AuthContext";

import classes from "./Profile.module.css";

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const options={
    title: "ASD",
    onClick: "sort"
  }

  return (
    <MainContainer options={options}>
      
    </MainContainer>
  );
}

export default Profile;
