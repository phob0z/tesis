import React, { useCallback, useContext, useEffect, useState } from "react";

import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import GradeCard from "../../components/cards/GradeCard";

function Grades() {
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState([]);

  const [identification, setIdentification] = useState("");
  const [search, setSearch] = useState({
    identification: "",
    course: "",
    parallel: "",
    specialty: "",
    year: "2022",
  });

  const fetchFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Gradess/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      // eslint-disable-next-line
      const data1 = await response.json();
      const data = [
        { filter: "course", label: "Curso", options: ["8vo", "9no", "10mo"] },
        { filter: "parallel", label: "Paralelo", options: ["A", "B", "C"] },
        {
          filter: "specialty",
          label: "Especialidad",
          options: ["asd", "qwe", "zxc1ASDASDASD"],
        },
        { filter: "year", label: "Periodo", options: ["2022", "2023", "2024"] },
      ];
      setFilters([...data]);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Gradess/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      const data = [
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "1758963050",
          course: "8vo",
          parallel: "A",
          state: true,
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "1111111111",
          course: "9no",
          parallel: "B",
          state: true,
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2222222222",
          course: "1ero",
          parallel: "A2",
          state: false,
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "3333333333",
          course: "2do",
          parallel: "B1",
          state: true,
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "4444444444",
          course: "3ero",
          parallel: "C",
          state: false,
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "5555555555",
          course: "2do",
          parallel: "F",
          state: false,
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "6666666666",
          course: "10mo",
          parallel: "A5",
          state: false,
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "7777777777",
          course: "5to",
          parallel: "A",
          state: true,
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "8888888888",
          course: "6to",
          parallel: "D",
          state: false,
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD1",
          last_name: "QWEQWE1",
          identification: "9999999999",
          course: "6to",
          parallel: "E",
          state: true,
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD2",
          last_name: "QWEQWE2",
          identification: "0000000000",
          course: "5to",
          parallel: "D",
          state: true,
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2758963050",
          course: "8vo",
          parallel: "A",
          state: false,
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2111111111",
          course: "9no",
          parallel: "B",
          state: true,
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "3222222222",
          course: "1ero",
          parallel: "A2",
          state: true,
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2333333333",
          course: "2do",
          parallel: "B1",
          state: true,
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2444444444",
          course: "3ero",
          parallel: "C",
          state: false,
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2555555555",
          course: "2do",
          parallel: "F",
          state: false,
          specialty: "Especialidad3",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2666666666",
          course: "10mo",
          parallel: "A5",
          state: true,
          specialty: "Especialidad",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2777777777",
          course: "5to",
          parallel: "A",
          state: true,
          specialty: "Especialidad2",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2888888888",
          course: "6to",
          parallel: "D",
          state: true,
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD1",
          last_name: "QWEQWE1",
          identification: "2999999999",
          course: "6to",
          parallel: "E",
          state: true,
          specialty: "Especialidad3",
        },
        {
          name: "ASDASD2",
          last_name: "QWEQWE2",
          identification: "2000000000",
          course: "5to",
          parallel: "D",
          state: false,
          specialty: "Especialidad3",
        },
      ];
      setStudents([...data]);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal]);

  useEffect(() => {
    fetchFilters();
    fetchData();
  }, [fetchFilters, fetchData]);

  useEffect(() => {
    onChange();
    // eslint-disable-next-line
  }, [search]);

  const onSearch = () => {
    setSearch((prevState) => {
      return { ...prevState, identification: identification };
    });
  };

  const onChange = () => {
    console.log("Hacer el pedido al back con los nuevos parametros");
    fetchData();
  };

  return (
    <LongMainContainer
      title="Calificaciones"
      onSearch={onSearch}
      showSearchInput
      filters={filters}
      onChange={onChange}
      identification={identification}
      onIdentificationChange={(event) => {
        setIdentification(event.target.value);
      }}
    >
      {students.length === 0 ? (
        <LongSubContainer>
          No se encontraron estudiantes con esos parámetros.
        </LongSubContainer>
      ) : (
        students.map((student) => {
          return (
            <LongSubContainer key={student.identification}>
              <GradeCard
                name={student.name}
                last_name={student.last_name}
                identification={student.identification}
                course={student.course}
                parallel={student.parallel}
                specialty={student.specialty}
                state={student.state}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Grades;
