import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";
import OnOffInput from "../../components/atoms/OnOffInput";

function EditAcademicYear() {
  const params = useParams();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [academicYear, setAcademicYear] = useState({});

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

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/period/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.academic_period;
      console.log(data);
      setAcademicYear(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token, params.id]);

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
        `${process.env.REACT_APP_BACK_URL}/period/${params.id}/update`,
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
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deactivate = async (state) => {
    setIsLoading(true);
    try {
      await axios.get(
        `${process.env.REACT_APP_BACK_URL}/period/${params.id}/destroy`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      setAcademicYear((prevState) => {
        return { ...prevState, state };
      });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }

    setIsLoading(false);
  };

  return (
    <MainContainer
      title="Periodo"
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
          value={academicYear.name??""}
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
          value={academicYear.finq1??""}
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
          value={academicYear.finq2??""}
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
        <Card label="Estado">
          <OnOffInput
            value={academicYear.state}
            onChange={(state) => {
              deactivate(state);
            }}
          />
        </Card>
      </SubContainer>
    </MainContainer>
  );
}

export default EditAcademicYear;
