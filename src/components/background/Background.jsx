import React, { Fragment } from "react";
// import Mancha from "./atoms/icons/Mancha";
import classes from "./Background.module.css";

const Background = () => {
  return (
    <Fragment>
      <div className={classes.ball1}></div>
      <div className={classes.ball2}></div>
      <div className={classes.ball3}></div>
      <div className={classes.ball4}></div>
      <div className={classes.ball5}></div>
      <div className={classes.ball6}></div>
      <div className={classes.ball7}></div>
    </Fragment>
  );
};

export default Background;
