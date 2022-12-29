import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import classes from "./OnOffCard.module.css";

function CourseCard(props) {
  const navigate = useNavigate();

  const onEditHandler = () => {
    navigate(props.id);
  };

  const activeIcon = (
    <span style={{ cursor: "default" }} className="material-symbols-outlined">
      check_circle
    </span>
  );
  const inActiveIcon = (
    <span style={{ cursor: "default" }} className="material-symbols-outlined">
      cancel
    </span>
  );

  return (
    <div className={classes.data}>
      <div>{props.name}</div>
      <div className={`${props.active ? classes.active : classes.inactive}`}>
        {props.active ? activeIcon : inActiveIcon}
      </div>
      <div>
        <Button className="editButton" onClick={onEditHandler}>
          Editar
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
