import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import classes from "./StudentCard.module.css";

function StudentCard(props) {
  const navigate = useNavigate();

  const onIcon = (
    <span style={{ cursor: "default" }} className="material-symbols-outlined">
      check_circle
    </span>
  );
  const offIcon = (
    <span style={{ cursor: "default" }} className="material-symbols-outlined">
      cancel
    </span>
  );

  const onEditHandler = () => {
    navigate(props.identification);
  }
  return (
    <div className={classes.student}>
      <div className={classes.name}>
        {props.name.split(" ")[0]} {props.last_name.split(" ")[0]}
      </div>
      <div>{props.identification}</div>
      <div>{props.course}</div>
      <div>{props.parallel}</div>
      <div>{props.specialty}</div>
      <div className={`${props.state ? classes.onIcon : classes.offIcon}`}>
        {props.state ? onIcon : offIcon}
      </div>
      <div>
        <Button className="editButton" onClick={onEditHandler}>Editar</Button>
      </div>
    </div>
  );
}

export default StudentCard;
