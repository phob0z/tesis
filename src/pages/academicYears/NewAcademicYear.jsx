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
    finq1: "",
    finq2: "",
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
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/period/create`,
        {
          name: academicYear.name,
          finq1: academicYear.finq1,
          finq2: academicYear.finq2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      setModal({ title: "CORRECTO", message: response.data.message });
      navigate("../");
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  return (
    <MainContainer
      title="Nuevo periodo"
      buttonTitle="Guardar"
      type="submit"
      onClick={(event) => {
        if (
          new Date(academicYear.finq1).getTime() >
          new Date(academicYear.finq2).getTime()
        ) {
          setModal({
            title: "Error en el campo " + "fechas".toUpperCase(),
            message:
              "La fecha de finalización del Q1 no puede ser mayor a la del Q2",
          });
          return;
        }
        saveData(event);
      }}
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
          must
          disabled={user.role !== "secretary"}
        />
        <Card
          type="date"
          label="Fin Q1"
          value={academicYear.finq1}
          onChange={(date) => {
            setAcademicYear((prevState) => {
              return { ...prevState, finq1: date };
            });
          }}
          setError={setErrorEndQ1}
          validation="date"
          minDate="0"
          maxDate="1"
          disabled={user.role !== "secretary"}
        />
        <Card
          type="date"
          label="Fin Q2"
          value={academicYear.finq2}
          onChange={(date) => {
            setAcademicYear((prevState) => {
              return { ...prevState, finq2: date };
            });
          }}
          setError={setErrorEndQ2}
          validation="date"
          minDate="0"
          maxDate="1"
          disabled={user.role !== "secretary"}
        />
      </SubContainer>
    </MainContainer>
  );
}

export default NewAcademicYear;
