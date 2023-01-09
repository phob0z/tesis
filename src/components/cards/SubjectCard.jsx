import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import OnOffIcon from "../icons/OnOffIcon";
import classes from "./SubjectCard.module.css";

function SubjectCard(props) {
  const navigate = useNavigate();

  return (
    <div className={classes.subject}>
      <div className={classes.name}>{props.name}</div>
      {/* <div>{props.teacher.split(" ")[0]}</div> */}
      <div>NOMBRE</div>
      <div>
        {/* {props.course} {props.parallel} */}
        Curso y Paralelo
      </div>
      {/* <div>{props.specialty}</div> */}
      <div>Especialidad</div>
      {/* <div>{props.academicYear}</div> */}
      <div>Periodo</div>
      <OnOffIcon state={props.state} />
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
