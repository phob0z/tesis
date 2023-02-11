import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Option.module.css";

function Option(props) {
  const navigate = useNavigate();

  return (
    <div className={classes.optionBox}>
      <div
        className={props.selected? classes.selected: classes.option}
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}
        onClick={() => {
          navigate(props.route);
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Option;
