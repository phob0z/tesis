import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";
import Button from "../../components/atoms/Button";

import classes from "./AcademicYears.module.css";
import Input from "../../components/atoms/Input";

function EditAcademicYear() {
  const params = useParams();
  const navigate = useNavigate();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [academicYear, setAcademicYear] = useState({});

  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEndQ1, setErrorEndQ1] = useState(false);
  const [errorEndQ2, setErrorEndQ2] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    errorName.error
      ? setError(errorName)
      : errorEndQ1.error
      ? setError(errorEndQ1)
      : errorEndQ2.error
      ? setError(errorEndQ2)
      : setError(false);
  }, [errorName, errorEndQ1, errorEndQ2]);

  const endPeriod = async () => {
    if (confirm !== "Finalizar " + academicYear.name) {
      setConfirm("");
      setCheck(false);
      setModal({
        title: "ERROR",
        message: "El mensaje no coincide.\nNo se finalizó el periodo.",
      });
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_URL}/secretary/endPeriod`,
          {},
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
    }
  };

  const fetchData = async () => {
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
      setAcademicYear(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

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
    // eslint-disable-next-line
  }, []);

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
          value={academicYear.name ?? ""}
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
          value={academicYear.finq1 ?? ""}
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
          value={academicYear.finq2 ?? ""}
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
      {academicYear.state === 1 && (
        <SubContainer>
          <Card label="Estado">
            {!check ? (
              <div className={classes.endPeriod}>
                <Button
                  onClick={() => {
                    setCheck(true);
                  }}
                >
                  Finalizar Periodo
                </Button>
              </div>
            ) : (
              <div className={classes.endPeriod}>
                <div className={classes.alert}>
                  ¿Esta seguro? Este proceso es irreversible, no podrá volver a
                  activar el periodo, ni agregar o ni modificar nada de este
                  periodo. Escriba{" "}
                  <span className={classes.bold}>
                    "Finalizar {academicYear.name}"
                  </span>
                  {" "}y presione el botón para finalizar el periodo.
                </div>
                <span style={{ height: "1rem" }}></span>
                <Input
                  type="text"
                  theme="simple"
                  value={confirm}
                  onChange={(event) => {
                    setConfirm(event.target.value);
                  }}
                />
                <span style={{ height: "1rem" }}></span>
                <Button onClick={endPeriod}>Finalizar Periodo</Button>
              </div>
            )}
          </Card>
        </SubContainer>
      )}
    </MainContainer>
  );
}

export default EditAcademicYear;
