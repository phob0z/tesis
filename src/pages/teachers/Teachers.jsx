import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import TeacherCard from "../../components/cards/TeacherCard";

function Teachers() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [teachers, setTeachers] = useState(null);

  const [searchBar, setSearchBar] = useState("");
  const [search, setSearch] = useState({
    identification: "",
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/teacher`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.users;
      setTeachers([...data]);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      title="Profesores"
      buttonTitle="Nuevo"
      onClick={() => {
        navigate("newTeacher");
      }}
      onSearch={onSearch}
      showSearchInput
      searchBar={searchBar}
      searchBarLabel="Identificación"
      onIdentificationChange={(event) => {
        setSearchBar(event.target.value);
      }}
    >
      {!teachers ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            Escribir una identificación y posteriormente hacer clic en el botón
            "Buscar"
          </div>
        </LongSubContainer>
      ) : teachers.length === 0 ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            No se encontraron profesores con esos parámetros.
          </div>
        </LongSubContainer>
      ) : (
        teachers.map((teacher) => {
          return (
            <LongSubContainer key={teacher.identification}>
              <TeacherCard
                id={teacher.id}
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
