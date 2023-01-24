import React, { Fragment } from "react";

import classes from "./GradesHeader.module.css";

function GradesHeader(props) {
  return (
    <Fragment>
      <div className={classes.studentInfo}>
        <div className={classes.subInfo}>
          <div>
            Estudiante: {props.student_name} {props.student_last_name}
          </div>
        </div>
        <div className={classes.subInfo}>
          <div>Especialidad: {props.specialty}</div>
        </div>
        <div className={classes.subInfo}>
          <div>Curso: {props.course}</div>
          <div
            style={{
              transform: "translateX(-70%)",
            }}
          >
            Paralelo: {props.parallel}
          </div>
          <div>Periodo: {props.academic_period}</div>
        </div>
      </div>
      <div className={classes.subjectHeader}>
        <div className={classes.name}>Asignatura</div>
        <div>
          <div className={classes.quimester}>Quimestre 1</div>
          <div className={classes.subquimester}>
            <div className={classes.grade}>Parcial 1</div>
            <div className={classes.grade}>Parcial 2</div>
            <div className={classes.grade}>Parcial 3</div>
            <div className={classes.grade}>Final Q1</div>
          </div>
        </div>
        <div>
          <div className={classes.quimester}>Quimestre 2</div>
          <div className={classes.subquimester}>
            <div className={classes.grade}>Parcial 1</div>
            <div className={classes.grade}>Parcial 2</div>
            <div className={classes.grade}>Parcial 3</div>
            <div className={classes.grade}>Final Q2</div>
          </div>
        </div>
        <div className={classes.extra}>Supletorio</div>
        <div className={classes.extra}>Remedial</div>
        <div className={classes.extra}>Gracia</div>
        <div className={classes.final}>Final</div>
      </div>
    </Fragment>
  );
}

export default GradesHeader;
