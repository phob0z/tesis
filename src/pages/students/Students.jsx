import React, { useCallback, useContext, useEffect, useState } from "react";
import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/container/LongMainContainer";
import LongSubContainer from "../../components/container/LongSubContainer";
import StudentCard from "./StudentCard";

// import Card from "../../components/atoms/Card";

function Students() {
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [students, setStudents] = useState([]);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Students/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      const students = [
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "1758963050",
          course: "Curso",
          parallel: "Paralelo",
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "1111111111",
          course: "Curso2",
          parallel: "Paralelo2",
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2222222222",
          course: "Curso3",
          parallel: "Paralelo3",
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "3333333333",
          course: "Curso",
          parallel: "Paralelo",
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "4444444444",
          course: "Curso2",
          parallel: "Paralelo2",
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "5555555555",
          course: "Curso3",
          parallel: "Paralelo3",
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "6666666666",
          course: "Curso",
          parallel: "Paralelo",
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "7777777777",
          course: "Curso2",
          parallel: "Paralelo2",
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "88888888888",
          course: "Curso3",
          parallel: "Paralelo3",
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD1",
          last_name: "QWEQWE1",
          identification: "99999999999",
          course: "Curso3",
          parallel: "Paralelo3",
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD2",
          last_name: "QWEQWE2",
          identification: "00000000000",
          course: "Curso3",
          parallel: "Paralelo3",
          specialty: "Especialidad3",
        },
      ];
      setStudents([...students]);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
      setHasError(true);
    }
    setIsLoading(false);
  }, [setHasError, setIsLoading, setModal]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const newStudent = (event) => {
    console.log("Cambiar ruta /newStudent");
  };

  return (
    <LongMainContainer title="Estudiantes" buttonTitle="Guardar">
      {students.length === 0 ? (
        <LongSubContainer>
          No se encontraron estudiantes con esos parámetros.
        </LongSubContainer>
      ) : (
        students.map((student) => {
          return (
            <LongSubContainer key={student.identification}>
              <StudentCard
                name={student.name}
                last_name={student.last_name}
                identification={student.identification}
                course={student.course}
                parallel={student.parallel}
                specialty={student.specialty}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Students;
