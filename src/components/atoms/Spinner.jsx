import React from "react";

import classes from "./Spinner.module.css";

const Spinner = (props) => {
  return (
    <div
      className={`${
        props.show ? classes.show : classes.hide
      }`}
      // onClick={props.close}
    >
      <div className={classes.spinner}></div>
      <div className={classes.spinner2}></div>
    </div>
  );
};

export default Spinner;
