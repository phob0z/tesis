import React, { Fragment } from "react";
import classes from "./MainContainer.module.css";

function MainContainer(props) {
  return (
    <Fragment>
      <div className={classes.mainContainer}> {props.children} </div>
      <div className={classes.containerTitle}> {props.title} </div>
    </Fragment>
  );
}

export default MainContainer;
