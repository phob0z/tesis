import React, { Fragment } from "react";

import classes from "./Spinner.module.css";

const Spinner = (props) => {
  return (
    <Fragment>
      <div
        className={`${classes.spinner} ${
          props.show ? classes.show : classes.hide
        }`}
        onClick={props.closed}
      ></div>
      <div
        className={`${classes.spinner2} ${
          props.show ? classes.show : classes.hide
        }`}
        onClick={props.closed}
      ></div>
    </Fragment>
  );
};

export default Spinner;
