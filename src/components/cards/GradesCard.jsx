import React from "react";
import classes from "./GradesCard.module.css";

function GradesCard(props) {
  return (
    <div className={classes.subject}>
      <div className={classes.name}>{props.name}</div>
      <div className={classes.quimester}>
        <div className={`${classes.grade} ${props.q1blocked ? "blocked" : ""}`}>
          {props.q1p1}
        </div>
        <div className={`${classes.grade} ${props.q1blocked ? "blocked" : ""}`}>
          {props.q1p2}
        </div>
        <div className={`${classes.grade} ${props.q1blocked ? "blocked" : ""}`}>
          {props.q1p3}
        </div>
      </div>
      <div className={classes.quimester}>
        <div className={`${classes.grade} ${props.q2blocked ? "blocked" : ""}`}>
          {props.q2p1}
        </div>
        <div className={`${classes.grade} ${props.q2blocked ? "blocked" : ""}`}>
          {props.q2p2}
        </div>
        <div className={`${classes.grade} ${props.q2blocked ? "blocked" : ""}`}>
          {props.q2p3}
        </div>
      </div>
      <div className={classes.extra}>
        <div className={`${classes.grade} ${props.q2blocked ? "blocked" : ""}`}>
          {props.supletory}
        </div>
      </div>
      <div className={classes.extra}>
        <div className={`${classes.grade} ${props.q2blocked ? "blocked" : ""}`}>
          {props.remedial}
        </div>
      </div>
      <div className={classes.extra}>
        <div className={`${classes.grade} ${props.q2blocked ? "blocked" : ""}`}>
          {props.grace}
        </div>
      </div>
      <div className={classes.final}>{props.final}</div>
    </div>
  );
}

export default GradesCard;
