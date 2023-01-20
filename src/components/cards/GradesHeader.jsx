import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import classes from "./GradesHeader.module.css";

function GradesHeader(props) {
  const params = useParams();
  const [student, setStudent] = useState({
    student_name: "",
    student_last_name: "",
    course: "",
    parallel: "",
    specialty: "",
    academic_period: "",
    behaviour1: "",
    behaviour2: "",
  });

  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const fetchStudent = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/student/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.user;
      data.birthdate = new Date(data.birthdate)
        .toISOString()
        .split("T", 1)[0]
        .split("-");
      setStudent(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  return (
    <Fragment>
      <div className={classes.studentInfo}>
        <div className={classes.subInfo}>
          <div>
            Estudiante: {props.student_name} {props.student_last_name}
          </div>
          {/* <div>Identificación: {props.identification}</div> */}
        </div>
        {/* <div className={classes.subInfo}>
          <div>
            Nacimiento: {props.birthdate[2]}-{props.birthdate[1]}-
            {props.birthdate[0]}
          </div>
          <div>Correo: {props.email}</div>
        </div> */}
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
