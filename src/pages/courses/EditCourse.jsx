import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// eslint-disable-next-line
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/Cards/Card";
import OnOffInput from "../../components/atoms/OnOffInput";

function EditCourse() {
  const navigate = useNavigate();
  const params = useParams();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [course, setCourse] = useState({});

  const [error, setError] = useState(false);
  const [errorIdentification, setErrorIdentification] = useState(false);

  useEffect(() => {
    errorIdentification.error ? setError(errorIdentification) : setError(false);
  }, [errorIdentification]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      // eslint-disable-next-line
      const data1 = await response.json();
      const data = {
        identification: params.identification,
        state: true,
      };
      setCourse(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
    // eslint-disable-next-line
  }, [setHasError, setIsLoading, setModal, token]);

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
      // eslint-disable-next-line
      const data1 = await response.json();
      setIsLoading(false);
      // setModal({ title: "CORRECTO", message: response.data.message });
      setModal({
        title: "CORRECTO",
        message: "Cambiar este modal por el del mensaje correcto",
      });
      setHasError(true);
      console.log(course);
      // navigate("/courses");
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
    // eslint-disable-next-line
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer
      title="Curso"
      buttonTitle="Guardar"
      type="submit"
      onClick={saveData}
    >
      <SubContainer>
        <Card
          label="Curso"
          value={course.identification}
          maxLength="10"
          onChange={(event) => {
            setCourse((prevState) => {
              return { ...prevState, identification: event.target.value };
            });
          }}
          setError={setErrorIdentification}
          validation="identification"
          disabled={user.role !== "secretary"}
        />
        <Card label="Estado">
          <OnOffInput
            value={course.state}
            onChange={(state) => {
              setCourse((prevState) => {
                return { ...prevState, state: state };
              });
            }}
          />
        </Card>
      </SubContainer>
    </MainContainer>
  );
}

export default EditCourse;
