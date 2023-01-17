import React, { Fragment } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import classes from "./GradesMainContainer.module.css";
import LongSubContainer from "./LongSubContainer";

function GradesMainContainer(props) {
  return (
    <Fragment>
      <div
        className={`${classes.mainContainer}`}
      >
        <LongSubContainer>
          <div className={classes.gradesHeader}>
            <div className={classes.name}>Nombre</div>
            <div className={classes.quimester}>
              <div>Quimestre 1</div>
              <div className={classes.subHeader}>
                <div>P1</div>
                <div>P2</div>
                <div>P3</div>
              </div>
            </div>
            <div className={classes.quimester}>
              <div>Quimestre 2</div>
              <div className={classes.subHeader}>
                <div>P1</div>
                <div>P2</div>
                <div>P3</div>
              </div>
            </div>
            <div className={classes.extra}>Supletorio</div>
            <div className={classes.extra}>Remedial</div>
            <div className={classes.extra}>Gracia</div>
            <div className={classes.final}>Final</div>
          </div>
        </LongSubContainer>
        {props.children}
      </div>

      {props.title && (
        <div className={`${classes.containerTitle} ${classes.space}`}>
          {props.title}
        </div>
      )}

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

export default GradesMainContainer;
