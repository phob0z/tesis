import React, { Fragment } from "react";
import Button from "../atoms/Button";
import classes from "./MainContainer.module.css";
import { useNavigate } from "react-router-dom";

function MainContainer(props) {
  let navigate = useNavigate();

  return (
    <Fragment>
      <div className={classes.mainContainer} style={props.style}>
        {props.children}
      </div>
      {props.title && (
        <div className={classes.containerTitle}> {props.title} </div>
      )}
      <div className={classes.buttons}>
        {props.backButton && (
          <Button onClick={() => navigate("../")}>Volver</Button>
        )}
        {props.subjectButton && (
          <Button onClick={() => navigate(props.subjectButton)}>
            Ver asignaturas
          </Button>
        )}
        {props.buttonTitle && (
          <Button type="submit" onClick={props.onClick}>
            {props.buttonTitle}
          </Button>
        )}
      </div>
    </Fragment>
  );
}

export default MainContainer;
