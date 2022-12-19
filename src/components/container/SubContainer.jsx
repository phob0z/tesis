import React from "react";
import Button from "../atoms/Button";
import classes from "./SubContainer.module.css";

function SubContainer(props) {
  return (
    <div className={classes.subContainer}>
      <div className={classes.subTitle}>{props.subTitle}</div>
      {props.children}
      {props.buttonTitle && (
        <div className={classes.button}>
          <Button onClick={props.onClick}>{props.buttonTitle}</Button>
        </div>
      )}
    </div>
  );
}

export default SubContainer;
