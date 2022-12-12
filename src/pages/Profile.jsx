import React, { Fragment, useContext } from "react";
import AuthContext from "../contexts/auth/AuthContext";

import classes from "./Profile.module.css";

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.containerOptions}></div>Profile
      </div>
    </Fragment>
  );
}

export default Profile;
