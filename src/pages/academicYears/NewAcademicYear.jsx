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
    endq1: "",
    endq2: "",
  });

  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEndQ1, setErrorEndQ1] = useState(false);
  const [errorEndQ2, setErrorEndQ2] = useState(false);

  useEffect(() => {
    errorName.error
      ? setError(errorName)
      : errorEndQ1.error
      ? setError(errorEndQ1)
      : errorEndQ2.error
      ? setError(errorEndQ2)
      : setError(false);
  }, [errorName, errorEndQ1, errorEndQ2]);

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
          maxLength="4"
          onChange={(event) => {
            setAcademicYear((prevState) => {
              return { ...prevState, name: event.target.value };
            });
          }}
          setError={setErrorName}
          validation="academicYear"
          disabled={user.role !== "secretary"}
        />
        <Card
          type="date"
          label="Fin Q1"
          value={academicYear.endq1}
          onChange={(date) => {
            setAcademicYear((prevState) => {
              return { ...prevState, endq1: date };
            });
          }}
          setError={setErrorEndQ1}
          validation="date"
          disabled={user.role !== "secretary"}
        />
        <Card
          type="date"
          label="Fin Q2"
          value={academicYear.endq2}
          onChange={(date) => {
            setAcademicYear((prevState) => {
              return { ...prevState, endq2: date };
            });
          }}
          setError={setErrorEndQ2}
          validation="date"
          disabled={user.role !== "secretary"}
        />
      </SubContainer>
    </MainContainer>
  );
}

export default NewAcademicYear;
