import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import OnOffIcon from "../icons/OnOffIcon";
import classes from "./StudentCard.module.css";

function StudentCard(props) {
  const navigate = useNavigate();

  return (
    <div className={classes.student}>
      <div className={classes.name}>
        {props.name?.split(" ")[0]} {props.last_name?.split(" ")[0]}
      </div>
      <div>{props.identification}</div>
      <div>{props.course} {props.parallel}</div>
      <div>{props.specialty}</div>
      <div>{props.academic_period}</div>
      <OnOffIcon state={props.state} />
      <div>
        <Button
          className="editButton"
          onClick={() => {
            navigate(`./${props.id}`);
          }}
        >
          {props.buttonTitle}
        </Button>
      </div>
    </div>
  );
}

export default StudentCard;
