import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import classes from "./SubjectCard.module.css";

function SubjectCard(props) {
  const navigate = useNavigate();

  return (
    <div className={classes.subject}>
      <div className={classes.name}>{props.name}</div>
      <div>{props.teacher_name?.split(" ")[0]} {props.teacher_last_name?.split(" ")[0]}</div>
      <div>
        {props.course} {props.parallel}
      </div>
      <div>{props.specialty}</div>
      <div>{props.academicYear}</div>
      <div>
        <Button
          className="editButton"
          onClick={() => {
            navigate(`./${props.id}`);
          }}
        >
          Editar
        </Button>
      </div>
    </div>
  );
}

export default SubjectCard;
