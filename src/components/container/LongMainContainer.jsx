import React, { Fragment } from "react";
import Button from "../atoms/Button";
import classes from "./LongMainContainer.module.css";

function LongMainContainer(props) {
  var flow = props.gridFlow? "": classes.gridFlowCol;
  return (
    <Fragment>
      <div className={`${classes.mainContainer} ${flow}`}> {props.children} </div>
      {props.title && <div className={classes.containerTitle}> {props.title} </div>}
      {props.buttonTitle && (
        <div className={classes.button}>
          <Button onClick={props.onClick}>
            {props.buttonTitle}
          </Button>
        </div>
      )}
    </Fragment>
  );
}

export default LongMainContainer;
