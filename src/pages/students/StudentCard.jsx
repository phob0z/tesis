import React from "react";
import Button from "../../components/atoms/Button";
import classes from "./StudentCard.module.css";

function StudentCard(props) {
  return (
    <div className={classes.student}>
      <div className={classes.name}>
        {props.name} {props.last_name}
      </div>
      <div className={classes.course}>{props.course}</div>
      <div className={classes.parallel}>{props.parallel}</div>
      <div className={classes.specialty}>{props.specialty}</div>
      <Button className="editButton">Editar</Button>
    </div>
  );
}

export default StudentCard;
