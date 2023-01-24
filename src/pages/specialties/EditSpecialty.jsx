import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";
import OnOffInput from "../../components/atoms/OnOffInput";

function EditSpecialty() {
  const params = useParams();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [specialty, setSpecialty] = useState({});

  const [error, setError] = useState(false);
  const [errorIdentification, setErrorIdentification] = useState(false);

  useEffect(() => {
    errorIdentification.error ? setError(errorIdentification) : setError(false);
  }, [errorIdentification]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/specialty/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.specialty;
      setSpecialty(data);
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
        `${process.env.REACT_APP_BACK_URL}/specialty/${params.id}/update`,
        {
          name: specialty.name,
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
        `${process.env.REACT_APP_BACK_URL}/specialty/${params.id}/destroy`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      setSpecialty((prevState) => {
        return { ...prevState, state };
      });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  return (
    <MainContainer
      title="Especialidad"
      buttonTitle="Guardar"
      type="submit"
      onClick={saveData}
      backButton
    >
      <SubContainer>
        <Card
          label="Especialidad"
          value={specialty.name ?? ""}
          maxLength="50"
          onChange={(event) => {
            setSpecialty((prevState) => {
              return { ...prevState, name: event.target.value };
            });
          }}
          setError={setErrorIdentification}
          validation="specialty"
          must
          disabled={user.role !== "secretary"}
        />
        <Card label="Estado">
          <OnOffInput
            value={specialty.state}
            onChange={(state) => {
              deactivate(state);
            }}
          />
        </Card>
      </SubContainer>
    </MainContainer>
  );
}

export default EditSpecialty;
