import React, { Fragment } from "react";
import classes from "./Background.module.css";

const Background = () => {
  return (
    <Fragment>
      <div className={classes.ball1} />
      <div className={classes.ball2} />
      <div className={classes.ball3} />
      <div className={classes.ball4} />
      <div className={classes.ball5} />
      <div className={classes.ball6} />
      <div className={classes.ball7} />
      <div className="minimunReached">
        <div className={classes.modal}>
          <div className={classes.header}>
            ERROR
          </div>
          <div className={classes.body}>
            <div className={classes.message}>La aplicación no esta diseñada para este tamaño de pantalla</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Background;
