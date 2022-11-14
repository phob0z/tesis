import React from "react";

import classes from "./Option.module.css";

function Option(props) {
  return (
    <div className={classes.optionBox}>
      <div className={classes.option}>{props.children}</div>
    </div>
  );
}

export default Option;
