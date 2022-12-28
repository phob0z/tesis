import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import classes from "./TeacherCard.module.css";

function TeacherCard(props) {
  const navigate = useNavigate();

  const onEditHandler = () => {
    navigate(props.identification);
  }
  return (
    <div className={classes.teacher}>
      <div className={classes.name}>
        {props.name.split(" ")[0]} {props.last_name.split(" ")[0]}
      </div>
      <div>{props.identification}</div>
      <div>
        <Button className="editButton" onClick={onEditHandler}>Editar</Button>
      </div>
    </div>
  );
}

export default TeacherCard;
