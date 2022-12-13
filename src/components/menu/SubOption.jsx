import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SubOption.module.css";

function Option(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.route);
  }
  return (
    <div className={classes.subOptionBox}>
      <div className={classes.subOption} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} onClick={handleClick}>{props.children}</div>
    </div>
  );
}

export default Option;
