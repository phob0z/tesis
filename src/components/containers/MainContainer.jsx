import React, { Fragment } from "react";
import Button from "../atoms/Button";
import classes from "./MainContainer.module.css";
import { useNavigate } from "react-router-dom";

function MainContainer(props) {
  let navigate = useNavigate();

  return (
    <Fragment>
      <div className={classes.mainContainer} style={props.style}> {props.children} </div>
      {props.title && (
        <div className={classes.containerTitle}> {props.title} </div>
      )}
      {props.buttonTitle && (
        <div className={classes.buttons}>
          {props.backButton && (
            <Button onClick={() => navigate("../")}>Volver</Button>
          )}
          {props.addSubjectButton? (
            <Button onClick={() => navigate("./addSubject")}>Agregar asignatura</Button>
          ) : <div />}
          
          <Button type="submit" onClick={props.onClick}>
            {props.buttonTitle}
          </Button>
        </div>
      )}
    </Fragment>
  );
}

export default MainContainer;
