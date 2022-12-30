import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import OnOffIcon from "../icons/OnOffIcon";
import classes from "./OnOffCard.module.css";

function CourseCard(props) {
  const navigate = useNavigate();

  return (
    <div className={classes.data}>
      <div>{props.name}</div>
      <OnOffIcon state={props.state} />
      <div>
        <Button
          className="editButton"
          onClick={() => {
            navigate(props.id);
          }}
        >
          Editar
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
