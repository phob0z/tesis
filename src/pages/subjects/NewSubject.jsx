import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function NewSubject() {
  const navigate = useNavigate();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [subject, setSubject] = useState({
    id: "",
    name: "",
    teacher: "",
    specialty: "",
    academicYear: "",
  });

  const [error, setError] = useState(false);
  const [errorIdentification, setErrorIdentification] = useState(false);

  useEffect(() => {
    errorIdentification.error ? setError(errorIdentification) : setError(false);
  }, [errorIdentification]);

  const saveData = async (event) => {
    event.preventDefault();
    if (error) {
      setModal({
        title: "Error en el campo " + error.label.toUpperCase(),
        message: error.error,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      setIsLoading(false);
      // setModal({ title: "CORRECTO", message: response.data.message });
      setModal({
        title: "CORRECTO",
        message: "Cambiar este modal por el del mensaje correcto",
      });
      navigate("/subjects");
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
    }
  };

  return (
    <MainContainer
      title="Nueva asignatura"
      buttonTitle="Guardar"
      type="submit"
      onClick={saveData}
      backButton
    >
      <SubContainer>
        <Card
          label="Asignatura"
          value={subject.identification}
          maxLength="5"
          onChange={(event) => {
            setSubject((prevState) => {
              return { ...prevState, identification: event.target.value };
            });
          }}
          setError={setErrorIdentification}
          validation="code"
          disabled={user.role !== "secretary"}
        />
      </SubContainer>
    </MainContainer>
  );
}

export default NewSubject;
