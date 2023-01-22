import React from "react";
import Button from "../atoms/Button";
import classes from "./StudentCoursesCard.module.css";

function StudentCoursesCard(props) {
  return (
    <div className={classes.course}>
      <div>{props.course}</div>
      <div>{props.parallel}</div>
      <div>{props.specialty}</div>
      <div>{props.academic_period}</div>
      <div>
        <Button
          className="editButton"
          onClick={() => {
            props.onClick(props.academic_period_id);
          }}
        >
          {props.buttonTitle ?? "Editar"}
        </Button>
      </div>
    </div>
  );
}

export default StudentCoursesCard;
