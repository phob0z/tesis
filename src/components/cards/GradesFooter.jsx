import React, { Fragment, useEffect, useState } from "react";
import Grade from "./Grade";

import classes from "./GradesFooter.module.css";

function GradesFooter(props) {
  const [errorComp1, setErrorComp1] = useState(false);
  const [errorComp2, setErrorComp2] = useState(false);
  const [error, setError] = useState(false);

  const [student, setStudent] = useState({
    behaviour1: props.behaviour1,
    behaviour2: props.behaviour2,
    promedioFinal: props.promedioFinal,
  });

  useEffect(() => {
    props.onBehaviourChange(student);
    // eslint-disable-next-line
  }, [student.behaviour1, student.behaviour2]);

  useEffect(() => {
    errorComp1.error
      ? setError(errorComp1)
      : errorComp2.error
      ? setError(errorComp2)
      : setError(false);
    props.setError(error);
    // eslint-disable-next-line
  }, [errorComp1, errorComp2, error]);

  return (
    <Fragment>
      <div className={classes.subInfoFooter}>
        <div />
        <div>
          Comportamiento 1
          <Grade
            label="Comportamiento Q1"
            type="grade"
            value={student.behaviour1}
            maxLength="1"
            onChange={(event) => {
              setStudent((prevState) => {
                return { ...prevState, behaviour1: event.target.value };
              });
            }}
            setError={setErrorComp1}
            validation="behaviour"
            disabled={props.role !== "secretary"}
          />
        </div>
        <div>
          Comportamiento 2
          <Grade
            label="Comportamiento Q2"
            type="grade"
            value={student.behaviour2}
            maxLength="1"
            onChange={(event) => {
              setStudent((prevState) => {
                return { ...prevState, behaviour2: event.target.value };
              });
            }}
            setError={setErrorComp2}
            validation="behaviour"
            disabled={props.role !== "secretary"}
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
