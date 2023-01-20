import userEvent from "@testing-library/user-event";
import React, { Fragment, useEffect, useState } from "react";
import Grade from "./Grade";

import classes from "./GradesFooter.module.css";

function GradesFooter(props) {
  const [student, setStudent] = useState({
    behaviour1: props.behaviour1,
    behaviour2: props.behaviour2,
    promedioFinal: props.promedioFinal,
  });

  useEffect(() => {
    props.onBehaviourChange(student);
  }, [student.behaviour1, student.behaviour2]);

  return (
    <Fragment>
      <div className={classes.subInfoFooter}>
        <div />
        <div>
          Comportamiento 1
          <Grade
            type="grade"
            value={student.behaviour1}
            maxLength="1"
            onChange={(event) => {
              setStudent((prevState) => {
                return { ...prevState, behaviour1: event.target.value };
              });
            }}
            setError={props.setErrorBehaviour1}
            validation="behaviour"
            disabled={false}
          />
        </div>
        <div>
          Comportamiento 2
          <Grade
            type="grade"
            value={student.behaviour2}
            maxLength="1"
            onChange={(event) => {
              setStudent((prevState) => {
                return { ...prevState, behaviour2: event.target.value };
              });
            }}
            setError={props.setErrorBehaviour2}
            validation="behaviour"
            disabled={false}
          />
        </div>
        <div />
        <div />
        <div />
        <div>
          Promedio
          <Grade
            type="grade"
            value={props.promedioFinal}
            maxLength="5"
            disabled={true}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default GradesFooter;
