import React from "react";
import classes from "./SubContainer.module.css";

function SubContainer(props) {
  return (
    <div className={classes.subContainer}>
      <div className={classes.subTitle}>{props.subTitle}</div>
      {props.children}
    </div>
  );
}

export default SubContainer;
