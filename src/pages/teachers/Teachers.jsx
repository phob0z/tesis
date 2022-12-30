import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import TeacherCard from "../../components/cards/TeacherCard";

function Teachers() {
  const navigate = useNavigate();
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [teachers, setTeachers] = useState([]);

  const [identification, setIdentification] = useState("");
  const [search, setSearch] = useState({
    identification: "",
  });

  const fetchData = useCallback(async () => {
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
      const data1 = await response.json();
      const data = [
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "1758963050",
          state: true,
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "1111111111",
          state: false,
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2222222222",
          state: false,
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "3333333333",
          state: true,
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "4444444444",
          state: true,
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "5555555555",
          state: false,
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "6666666666",
          state: true,
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "7777777777",
          state: false,
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "8888888888",
          state: true,
        },
        {
          name: "ASDASD1",
          last_name: "QWEQWE1",
          identification: "9999999999",
          state: true,
        },
        {
          name: "ASDASD2",
          last_name: "QWEQWE2",
          identification: "0000000000",
          state: false,
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2758963050",
          state: true,
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2111111111",
          state: true,
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "3222222222",
          state: true,
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2333333333",
          state: true,
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2444444444",
          state: true,
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2555555555",
          state: true,
        },
        {
          name: "Leonel",
          last_name: "Molina",
          identification: "2666666666",
          state: true,
        },
        {
          name: "asdasd",
          last_name: "qweqwe",
          identification: "2777777777",
          state: true,
        },
        {
          name: "ASDASD",
          last_name: "QWEQWE",
          identification: "2888888888",
          state: true,
        },
        {
          name: "ASDASD1",
          last_name: "QWEQWE1",
          identification: "2999999999",
          state: true,
        },
        {
          name: "ASDASD2",
          last_name: "QWEQWE2",
          identification: "2000000000",
          state: true,
        },
      ];
      setTeachers([...data]);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    console.log(search);
    console.log("Haciendo el pedido al back con los nuevos parametros");
    fetchData();
  };

  return (
    <LongMainContainer
      title="Profesores"
      buttonTitle="Nuevo"
      onClick={() => {
        navigate("newTeacher");
      }}
      onSearch={onSearch}
      showSearchInput
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
                state={teacher.state}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Teachers;
