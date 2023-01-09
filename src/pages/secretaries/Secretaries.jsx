import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import TeacherCard from "../../components/cards/TeacherCard";

function Secretaries() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [secretaries, setSecretaries] = useState(null);

  const [search, setSearch] = useState({
    identification: "",
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/student/search`,
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
      setSecretaries([...data]);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, [setIsLoading, setModal, token]);

  const onSearch = () => {
    console.log(search);
    fetchData();
  };

  return (
    <LongMainContainer
      title="Secretarias"
      buttonTitle="Nuevo"
      onClick={() => {
        navigate("newSecretary");
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
      {!secretaries ? (
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
      ) : secretaries.length === 0 ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            No se encontraron secretarias con esos parámetros.
          </div>
        </LongSubContainer>
      ) : (
        secretaries.map((secretary) => {
          return (
            <LongSubContainer key={secretary.identification}>
              <TeacherCard
                id={secretary.id}
                name={secretary.name}
                last_name={secretary.last_name}
                identification={secretary.identification}
                state={secretary.state}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Secretaries;
