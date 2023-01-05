import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import StudentCard from "../../components/cards/StudentCard";
import axios from "axios";

function Students() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState([]);

  const [searchBar, setSearchBar] = useState("");
  const [search, setSearch] = useState({
    identification: "",
    course: "",
    parallel: "",
    specialty: "",
    academicYear: "",
  });

  const fetchFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await fetch("https://swapi.dev/api/people/");
      // const data1 = await response.json();
      const data = {
        course: ["Todos", "1ero", "8vo", "9no", "10mo"],
        parallel: ["Todos", "A", "B", "C", "D"],
        specialty: ["Todos", "asd", "qwe", "zxc1ASDASDASD"],
        academicYear: ["2023", "2022", "2021", "2020"],
      };
      setFilters(data);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/student`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.users;
      // console.log(response.data.data.users);
      // const data = [
      //   {
      //     name: "Leonel",
      //     last_name: "Molina",
      //     identification: "1758963050",
      //     course: "8vo",
      //     parallel: "A",
      //     state: true,
      //     specialty: "Especialidad",
      //   },
      //   {
      //     name: "asdasd",
      //     last_name: "qweqwe",
      //     identification: "1111111111",
      //     course: "9no",
      //     parallel: "B",
      //     state: true,
      //     specialty: "Especialidad2",
      //   },
      //   {
      //     name: "ASDASD",
      //     last_name: "QWEQWE",
      //     identification: "2222222222",
      //     course: "1ero",
      //     parallel: "A2",
      //     state: false,
      //     specialty: "Especialidad3",
      //   },
      //   {
      //     name: "Leonel",
      //     last_name: "Molina",
      //     identification: "3333333333",
      //     course: "2do",
      //     parallel: "B1",
      //     state: true,
      //     specialty: "Especialidad",
      //   },
      //   {
      //     name: "asdasd",
      //     last_name: "qweqwe",
      //     identification: "4444444444",
      //     course: "3ero",
      //     parallel: "C",
      //     state: false,
      //     specialty: "Especialidad2",
      //   },
      //   {
      //     name: "ASDASD",
      //     last_name: "QWEQWE",
      //     identification: "5555555555",
      //     course: "2do",
      //     parallel: "F",
      //     state: false,
      //     specialty: "Especialidad3",
      //   },
      //   {
      //     name: "Leonel",
      //     last_name: "Molina",
      //     identification: "6666666666",
      //     course: "10mo",
      //     parallel: "A5",
      //     state: false,
      //     specialty: "Especialidad",
      //   },
      //   {
      //     name: "asdasd",
      //     last_name: "qweqwe",
      //     identification: "7777777777",
      //     course: "5to",
      //     parallel: "A",
      //     state: true,
      //     specialty: "Especialidad2",
      //   },
      //   {
      //     name: "ASDASD",
      //     last_name: "QWEQWE",
      //     identification: "8888888888",
      //     course: "6to",
      //     parallel: "D",
      //     state: false,
      //     specialty: "Especialidad3",
      //   },
      //   {
      //     name: "ASDASD1",
      //     last_name: "QWEQWE1",
      //     identification: "9999999999",
      //     course: "6to",
      //     parallel: "E",
      //     state: true,
      //     specialty: "Especialidad3",
      //   },
      //   {
      //     name: "ASDASD2",
      //     last_name: "QWEQWE2",
      //     identification: "0000000000",
      //     course: "5to",
      //     parallel: "D",
      //     state: true,
      //     specialty: "Especialidad3",
      //   },
      //   {
      //     name: "Leonel",
      //     last_name: "Molina",
      //     identification: "2758963050",
      //     course: "8vo",
      //     parallel: "A",
      //     state: false,
      //     specialty: "Especialidad",
      //   },
      //   {
      //     name: "asdasd",
      //     last_name: "qweqwe",
      //     identification: "2111111111",
      //     course: "9no",
      //     parallel: "B",
      //     state: true,
      //     specialty: "Especialidad2",
      //   },
      //   {
      //     name: "ASDASD",
      //     last_name: "QWEQWE",
      //     identification: "3222222222",
      //     course: "1ero",
      //     parallel: "A2",
      //     state: true,
      //     specialty: "Especialidad3",
      //   },
      //   {
      //     name: "Leonel",
      //     last_name: "Molina",
      //     identification: "2333333333",
      //     course: "2do",
      //     parallel: "B1",
      //     state: true,
      //     specialty: "Especialidad",
      //   },
      //   {
      //     name: "asdasd",
      //     last_name: "qweqwe",
      //     identification: "2444444444",
      //     course: "3ero",
      //     parallel: "C",
      //     state: false,
      //     specialty: "Especialidad2",
      //   },
      //   {
      //     name: "ASDASD",
      //     last_name: "QWEQWE",
      //     identification: "2555555555",
      //     course: "2do",
      //     parallel: "F",
      //     state: false,
      //     specialty: "Especialidad3",
      //   },
      //   {
      //     name: "Leonel",
      //     last_name: "Molina",
      //     identification: "2666666666",
      //     course: "10mo",
      //     parallel: "A5",
      //     state: true,
      //     specialty: "Especialidad",
      //   },
      //   {
      //     name: "asdasd",
      //     last_name: "qweqwe",
      //     identification: "2777777777",
      //     course: "5to",
      //     parallel: "A",
      //     state: true,
      //     specialty: "Especialidad2",
      //   },
      //   {
      //     name: "ASDASD",
      //     last_name: "QWEQWE",
      //     identification: "2888888888",
      //     course: "6to",
      //     parallel: "D",
      //     state: true,
      //     specialty: "Especialidad3",
      //   },
      //   {
      //     name: "ASDASD1",
      //     last_name: "QWEQWE1",
      //     identification: "2999999999",
      //     course: "6to",
      //     parallel: "E",
      //     state: true,
      //     specialty: "Especialidad3",
      //   },
      //   {
      //     name: "ASDASD2",
      //     last_name: "QWEQWE2",
      //     identification: "2000000000",
      //     course: "5to",
      //     parallel: "D",
      //     state: false,
      //     specialty: "Especialidad3",
      //   },
      // ];
      setStudents([...data]);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token]);

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
      return { ...prevState, identification: searchBar };
    });
  };

  const onChange = () => {
    console.log(search);
    console.log("Haciendo el pedido al back con los nuevos parametros");
    fetchData();
  };

  return (
    <LongMainContainer
      title="Estudiantes"
      buttonTitle="Nuevo"
      onClick={() => {
        navigate("newStudent");
      }}
      onSearch={onSearch}
      showSearchInput
      search={search}
      filters={filters}
      onChange={(value) => {
        setSearch((prevState) => {
          return { ...prevState, ...value };
        });
      }}
      searchBar={searchBar}
      searchBarLabel="Identificación"
      onIdentificationChange={(event) => {
        setSearchBar(event.target.value);
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
              <StudentCard
                id={student.id}
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

export default Students;
