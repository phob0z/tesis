import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import OnOffIcon from "../icons/OnOffIcon";
import classes from "./StudentCard.module.css";

function StudentCard(props) {
  const navigate = useNavigate();

  const onEditHandler = () => {
    navigate(props.identification);
  };
  return (
    <div className={classes.student}>
      <div className={classes.name}>
        {props.name.split(" ")[0]} {props.last_name.split(" ")[0]}
      </div>
      <div>{props.identification}</div>
      <div>{props.course}</div>
      <div>{props.parallel}</div>
      <div>{props.specialty}</div>
      <OnOffIcon state={props.state} />
      <div>
        <Button className="editButton" onClick={onEditHandler}>
          Editar
        </Button>
      </div>
    </div>
  );
}

export default StudentCard;
