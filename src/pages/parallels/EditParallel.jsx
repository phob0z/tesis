import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/Cards/Card";
import OnOffInput from "../../components/atoms/OnOffInput";

function EditParallel() {
  const navigate = useNavigate();
  const params = useParams();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [parallel, setParallel] = useState({});

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
        identification: params.identification,
        state: true,
      };
      setParallel(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
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
      const data1 = await response.json();
      setIsLoading(false);
      // setModal({ title: "CORRECTO", message: response.data.message });
      setModal({
        title: "CORRECTO",
        message: "Cambiar este modal por el del mensaje correcto",
      });
      setHasError(true);
      navigate("/parallels");
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer
      title="Paralelo"
      buttonTitle="Guardar"
      type="submit"
      onClick={saveData}
    >
      <SubContainer>
        <Card
          label="Paralelo"
          value={parallel.identification}
          maxLength="10"
          onChange={(event) => {
            setParallel((prevState) => {
              return { ...prevState, identification: event.target.value };
            });
          }}
          setError={setErrorIdentification}
          validation="identification"
          disabled={user.role !== "secretary"}
        />
        <Card label="Estado">
          <OnOffInput
            value={parallel.state}
            onChange={(state) => {
              setParallel((prevState) => {
                return { ...prevState, state: state };
              });
            }}
          />
        </Card>
      </SubContainer>
    </MainContainer>
  );
}

export default EditParallel;
