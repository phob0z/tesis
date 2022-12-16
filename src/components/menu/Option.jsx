import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Option.module.css";

function Option(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    props.onClick();
    navigate(props.route);
  }

  return (
    <div className={classes.optionBox}>
      <div className={classes.option} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} onClick={handleClick}>{props.children}</div>
    </div>
  );
}

export default Option;
