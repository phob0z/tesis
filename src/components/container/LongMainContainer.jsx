import React, { Fragment } from "react";
import Button from "../atoms/Button";
import classes from "./LongMainContainer.module.css";

function LongMainContainer(props) {
  return (
    <Fragment>
      <div className={classes.mainContainer}> {props.children} </div>
      {props.title && <div className={classes.containerTitle}> {props.title} </div>}
      {props.buttonTitle && (
        <div className={classes.button}>
          <Button type="submit" onClick={props.onClick}>
            {props.buttonTitle}
          </Button>
        </div>
      )}
    </Fragment>
  );
}

export default LongMainContainer;
