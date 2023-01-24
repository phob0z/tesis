import React, { useContext, useState } from "react";
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

  const [search, setSearch] = useState({
    identification: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/teacher/search`,
        {
          identification: search.identification,
        },
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
  };

  const onSearch = () => {
    if (search.identification === "") {
      setModal({
        title: "ERROR",
        message: "Debe introducir una identificación a buscar",
      });
      return;
    }
    fetchData();
    setSearch((prevState) => {
      return {
        ...prevState,
        identification: "",
      };
    });
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
      search={search}
      onChange={(value) => {
        setSearch((prevState) => {
          return { ...prevState, ...value };
        });
      }}
      searchBarLabel="Identificación"
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
