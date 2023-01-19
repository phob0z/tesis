import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function NewSubject() {
  const navigate = useNavigate();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [subject, setSubject] = useState({
    name: "",
    teacher_id: "",
    course_id: "",
    parallel_id: "",
    specialty_id: "",
    academic_period_id: "",
  });

  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorCourse, setErrorCourse] = useState(false);
  const [errorParallel, setErrorParallel] = useState(false);
  const [errorSpecialty, setErrorSpecialty] = useState(false);
  const [errorAcademicYear, setErrorAcademicYear] = useState(false);
  const [errorTeacher, setErrorTeacher] = useState(false);

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    errorName.error
      ? setError(errorName)
      : errorCourse.error
      ? setError(errorCourse)
      : errorParallel.error
      ? setError(errorParallel)
      : errorSpecialty.error
      ? setError(errorSpecialty)
      : errorAcademicYear.error
      ? setError(errorAcademicYear)
      : errorTeacher.error
      ? setError(errorTeacher)
      : setError(false);
  }, [
    errorName,
    errorCourse,
    errorParallel,
    errorSpecialty,
    errorAcademicYear,
    errorTeacher,
  ]);

  const fetchFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/subject/filter`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const courses = response.data.data.courses;
      const parallels = response.data.data.parallels;
      const specialties = response.data.data.specialties;
      const academicYears = response.data.data.periods;
      const teachers = response.data.data.teachers;
      setFilters({ courses, parallels, specialties, academicYears, teachers });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const saveData = async (event) => {
    event.preventDefault();
    if (error) {
      setModal({
        title: "Error en el campo " + error.label.toUpperCase(),
        message: error.error,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/subject/create`,
        {
          name: subject.name,
          user_id: subject.teacher_id,
          course_id: subject.course_id,
          parallel_id: subject.parallel_id,
          specialty_id: subject.specialty_id,
          // academic_period_id: subject.academic_period_id,
          academic_period_id: filters.academicYears[0].id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      setModal({ title: "CORRECTO", message: response.data.message });
      navigate("../");
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  return (
    <MainContainer
      title="Nueva asignatura"
      buttonTitle="Guardar"
      type="submit"
      onClick={saveData}
      backButton
    >
      <SubContainer>
        <Card
          label="Asignatura"
          value={subject.name}
          maxLength="30"
          onChange={(event) => {
            setSubject((prevState) => {
              return { ...prevState, name: event.target.value };
            });
          }}
          setError={setErrorName}
          validation="course"
          must
          disabled={user.role !== "secretary"}
        />
        <Card
          label="Profesor"
          type="select"
          options={filters.teachers}
          theme="simple"
          value={subject.teacher_id}
          onChange={(event) => {
            setSubject({ ...subject, teacher_id: event.target.value });
          }}
          setError={setErrorTeacher}
          validation="select"
          disabled={user.role !== "secretary"}
        />
        {/* <Card
          label="Periodo"
          type="select"
          options={filters.academicYears}
          theme="simple"
          value={subject.academic_period_id}
          onChange={(event) => {
            setSubject({ ...subject, academic_period_id: event.target.value });
          }}
          setError={setErrorAcademicYear}
          validation="select"
          disabled={user.role !== "secretary"}
        /> */}
      </SubContainer>
      <SubContainer>
        <Card
          label="Curso"
          type="select"
          options={filters.courses}
          theme="simple"
          value={subject.course_id}
          onChange={(event) => {
            setSubject({ ...subject, course_id: event.target.value });
          }}
          setError={setErrorCourse}
          validation="select"
          disabled={user.role !== "secretary"}
        />
        <Card
          label="Paralelo"
          type="select"
          options={filters.parallels}
          theme="simple"
          value={subject.parallel_id}
          onChange={(event) => {
            setSubject({ ...subject, parallel_id: event.target.value });
          }}
          setError={setErrorParallel}
          validation="select"
          disabled={user.role !== "secretary"}
        />
        <Card
          label="Especialidad"
          type="select"
          options={filters.specialties}
          theme="simple"
          value={subject.specialty_id}
          onChange={(event) => {
            setSubject({ ...subject, specialty_id: event.target.value });
          }}
          setError={setErrorSpecialty}
          validation="select"
          disabled={user.role !== "secretary"}
        />
      </SubContainer>
    </MainContainer>
  );
}

export default NewSubject;
