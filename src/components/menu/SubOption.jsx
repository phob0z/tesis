import React from "react";
import classes from "./SubOption.module.css";

function Option(props) {
  return (
    <div className={classes.subOptionBox}>
      <div className={classes.subOption} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>{props.children}</div>
    </div>
  );
}

export default Option;
