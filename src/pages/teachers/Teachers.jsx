import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/container/LongMainContainer";
import LongSubContainer from "../../components/container/LongSubContainer";
import TeacherCard from "../../components/Cards/TeacherCard";

function Teachers() {
  const navigate = useNavigate();
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [teachers, setTeachers] = useState([]);
  const [filters, setFilters] = useState([]);

  const [identification, setIdentification] = useState("");
  const [search, setSearch] = useState({
    identification: "",
  });

  const fetchTeachers = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Teachers/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      // eslint-disable-next-line
      const data = await response.json();
      const teachers = [
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "1758963050",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "1111111111",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2222222222",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "3333333333",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "4444444444",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "5555555555",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "6666666666",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "7777777777",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "8888888888",
        },
        {
          name: "ASDASD1",
          last_name: "QWEQWE1",
          identification: "9999999999",
        },
        {
          name: "ASDASD2",
          last_name: "QWEQWE2",
          identification: "0000000000",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2758963050",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2111111111",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "3222222222",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2333333333",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2444444444",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2555555555",
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2666666666",
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2777777777",
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2888888888",
        },
        {
          name: "ASDASD1",
          last_name: "QWEQWE1",
          identification: "2999999999",
        },
        {
          name: "ASDASD2",
          last_name: "QWEQWE2",
          identification: "2000000000",
        },
      ];
      setTeachers([...teachers]);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
      setHasError(true);
    }
    setIsLoading(false);
  }, [setHasError, setIsLoading, setModal]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  useEffect(() => {
    onChange();
    // eslint-disable-next-line
  }, [search]);

  const newTeacher = (event) => {
    navigate("newTeacher");
  };

  const onSearch = () => {
    setSearch((prevState) => {
      return { ...prevState, identification: identification };
    });
  };

  const onChange = () => {
    console.log("Hacer el pedido al back con los filtros");
    fetchTeachers();
  };

  return (
    <LongMainContainer
      title="Profesores"
      buttonTitle="Nuevo"
      onClick={newTeacher}
      onSearch={onSearch}
      showSearchInput
      onChange={onChange}
      identification={identification}
      onIdentificationChange={(event) => {
        setIdentification(event.target.value);
      }}
    >
      {teachers.length === 0 ? (
        <LongSubContainer>
          No se encontraron profesores con esos parámetros.
        </LongSubContainer>
      ) : (
        teachers.map((teacher) => {
          return (
            <LongSubContainer key={teacher.identification}>
              <TeacherCard
                name={teacher.name}
                last_name={teacher.last_name}
                identification={teacher.identification}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Teachers;
