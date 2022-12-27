import React, { useCallback, useContext, useEffect, useState } from "react";
import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/container/LongMainContainer";
import LongSubContainer from "../../components/container/LongSubContainer";
import StudentCard from "./StudentCard";

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
          course: "8vo",
          parallel: "A",
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "1111111111",
          course: "9no",
          parallel: "B",
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2222222222",
          course: "1ero",
          parallel: "A2",
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "3333333333",
          course: "2do",
          parallel: "B1",
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "4444444444",
          course: "3ero",
          parallel: "C",
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "5555555555",
          course: "2do",
          parallel: "F",
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "6666666666",
          course: "10mo",
          parallel: "A5",
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "7777777777",
          course: "5to",
          parallel: "A",
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "8888888888",
          course: "6to",
          parallel: "D",
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD1",
          last_name: "QWEQWE1",
          identification: "9999999999",
          course: "6to",
          parallel: "E",
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD2",
          last_name: "QWEQWE2",
          identification: "0000000000",
          course: "5to",
          parallel: "D",
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2758963050",
          course: "8vo",
          parallel: "A",
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2111111111",
          course: "9no",
          parallel: "B",
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "3222222222",
          course: "1ero",
          parallel: "A2",
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2333333333",
          course: "2do",
          parallel: "B1",
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2444444444",
          course: "3ero",
          parallel: "C",
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2555555555",
          course: "2do",
          parallel: "F",
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2666666666",
          course: "10mo",
          parallel: "A5",
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2777777777",
          course: "5to",
          parallel: "A",
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2888888888",
          course: "6to",
          parallel: "D",
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD1",
          last_name: "QWEQWE1",
          identification: "2999999999",
          course: "6to",
          parallel: "E",
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD2",
          last_name: "QWEQWE2",
          identification: "2000000000",
          course: "5to",
          parallel: "D",
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
    <LongMainContainer title="Estudiantes" buttonTitle="Nuevo" onClick={()=>{console.log("Ir a Nuevo");}}>
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
