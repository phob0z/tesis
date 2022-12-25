import React from "react";
import Button from "../atoms/Button";
import classes from "./LongSubContainer.module.css";

function LongSubContainer(props) {
  return (
    <div className={classes.subContainer}>
      {props.subTitle && <div className={classes.subTitle}>{props.subTitle}</div>}
      {props.children}
      {props.buttonTitle && (
        <div className={classes.button}>
          <Button onClick={props.onClick}>{props.buttonTitle}</Button>
        </div>
      )}
    </div>
  );
}

export default LongSubContainer;
