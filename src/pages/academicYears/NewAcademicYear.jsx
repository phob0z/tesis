import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function NewAcademicYear() {
  const navigate = useNavigate();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [academicYear, setAcademicYear] = useState({
    id: "",
    name: "",
    state: true,
    endq1: (new Date()).toString(),
    endq2: (new Date()).toString(),
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
      navigate("/academicYears");
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
    }
  };

  return (
    <MainContainer
      title="Nuevo periodo"
      buttonTitle="Guardar"
      type="submit"
      onClick={saveData}
      backButton
    >
      <SubContainer>
      <Card
          label="Nombre"
          value={academicYear.name}
          maxLength="10"
          onChange={(event) => {
            setAcademicYear((prevState) => {
              return { ...prevState, name: event.target.value };
            });
          }}
          setError={setErrorIdentification}
          validation="identification"
          disabled={user.role !== "secretary"}
        />
        <Card
          type="date"
          label="Fin Q1"
          value={academicYear.endq1}
          maxLength="5"
          onChange={(event) => {
            setAcademicYear((prevState) => {
              return { ...prevState, endq1: event.target.value };
            });
          }}
          setError={setErrorIdentification}
          disabled={user.role !== "secretary"}
        />
        <Card
          type="date"
          label="Fin Q2"
          value={academicYear.endq2}
          maxLength="5"
          onChange={(event) => {
            setAcademicYear((prevState) => {
              return { ...prevState, endq2: event.target.value };
            });
          }}
          setError={setErrorIdentification}
          disabled={user.role !== "secretary"}
        />
      </SubContainer>
    </MainContainer>
  );
}

export default NewAcademicYear;
