import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/Cards/Card";

function NewAcademicYear() {
  const navigate = useNavigate();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [academicYear, setAcademicYear] = useState({});

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
      setHasError(true);
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
      setHasError(true);
      navigate("/academicYears");
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
  };

  return (
    <MainContainer
      title="Nuevo periodo"
      buttonTitle="Guardar"
      type="submit"
      onClick={saveData}
    >
      <SubContainer>
        <Card
          label="Periodo"
          value={academicYear.identification}
          maxLength="10"
          onChange={(event) => {
            setAcademicYear((prevState) => {
              return { ...prevState, identification: event.target.value };
            });
          }}
          setError={setErrorIdentification}
          validation="identification"
          disabled={user.role !== "secretary"}
        />
      </SubContainer>
    </MainContainer>
  );
}

export default NewAcademicYear;
