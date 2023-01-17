import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../contexts/alert/AlertContext";

import Grade from "../../components/cards/Grade";
import classes from "./GradesCard.module.css";

function GradesCard(props) {
  const { setIsLoading, setModal } = useContext(AlertContext);
  const [grades, setGrades] = useState({
    q1p1: props.q1p1,
    q1p2: props.q1p2,
    q1p3: props.q1p3,
    q2p1: props.q2p1,
    q2p2: props.q2p2,
    q2p3: props.q2p3,
    supletory: props.supletory,
    remedial: props.remedial,
    grace: props.grace,
    final: props.final,
  });
  const [errorq1p1, setErrorq1p1] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    errorq1p1.error ? setError(errorq1p1) : setError(false);
    console.log(errorq1p1);
    console.log(error);
  }, [errorq1p1, error]);

  return (
    <div className={classes.subject}>
      <div className={classes.name}>{props.name}</div>
      <div className={classes.quimester}>
        <div className={classes.grade}>
          { props.header? "P1" :
            <Grade
              type="grade"
              value={grades.q1p1}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, q1p1: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorq1p1}
              disabled={false}
            />
          }
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
