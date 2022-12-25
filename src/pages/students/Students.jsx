import React, { useCallback, useContext, useEffect, useState } from "react";
import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/container/LongMainContainer";
import LongSubContainer from "../../components/container/LongSubContainer";

// import Card from "../../components/atoms/Card";

function Students() {
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [students, setStudents] = useState({});

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
      const students = {
        "1758963050": {
          name: "Leonel",
          last_name: "Molina",
          identification: "1758963050",
          course: "Curso",
          parallel: "Paralelo",
          specialty: "Especialdiad",
        },
        "1111111111": {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "1111111111",
          course: "Curso2",
          parallel: "Paralelo2",
          specialty: "Especialidad2",
        },
        "2222222222": {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2222222222",
          course: "Curso3",
          parallel: "Paralelo3",
          specialty: "Especialidad3",
        },
      };
      setStudents({ ...students });
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
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
        <LongSubContainer>
        ASD
        </LongSubContainer>
      </LongMainContainer>
  );
}

export default Students;
