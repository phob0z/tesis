import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";
import OnOffInput from "../../components/atoms/OnOffInput";

function EditAcademicYear() {
  const navigate = useNavigate();
  const params = useParams();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [academicYear, setAcademicYear] = useState({});

  const [error, setError] = useState(false);
  const [errorIdentification, setErrorIdentification] = useState(false);

  useEffect(() => {
    errorIdentification.error ? setError(errorIdentification) : setError(false);
  }, [errorIdentification]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      const data = {
        id: "1",
        name: "2022",
        state: true,
        endq1: "2022/06/18",
        endq2: "2022/12/18",
      };
      setAcademicYear(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
    }
  }, [setIsLoading, setModal, token]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer
      title="Periodo"
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
          // validation="code"
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
          // validation="code"
          disabled={user.role !== "secretary"}
        />
        <Card label="Estado">
          <OnOffInput
            value={academicYear.state}
            onChange={(state) => {
              setAcademicYear((prevState) => {
                return { ...prevState, state: state };
              });
            }}
          />
        </Card>
      </SubContainer>
    </MainContainer>
  );
}

export default EditAcademicYear;
