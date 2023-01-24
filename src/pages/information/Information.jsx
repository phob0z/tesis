import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function Information() {
  const { setIsLoading, setModal } = useContext(AlertContext);

  const { user, token } = useContext(AuthContext);

  const [information, setInformation] = useState({});
  const [errorName, setErrorName] = useState(false);
  const [errorSecretary, setErrorSecretary] = useState(false);
  const [errorDirector, setErrorDirector] = useState(false);
  const [errorLogo, setErrorLogo] = useState(false);
  const [logoFile, setLogoFile] = useState();
  const [logoChanged, setLogoChanged] = useState(false);
  const [error, setError] = useState(false);

  const fetchInformation = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/information`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.info;
      const logo = response.data.data.avatar;
      setInformation({ ...data, logo });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchInformation();
  }, [fetchInformation]);

  useEffect(() => {
    errorName.error
      ? setError(errorName)
      : errorSecretary.error
      ? setError(errorSecretary)
      : errorDirector.error
      ? setError(errorDirector)
      : errorLogo.error
      ? setError(errorLogo)
      : setError(false);
  }, [errorName, errorSecretary, errorDirector, errorLogo]);

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
        `${process.env.REACT_APP_BACK_URL}/information/update`,
        {
          name: information.name,
          director_name: information.director_name,
          secretary_name: information.secretary_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      var formData = new FormData();
      if (logoChanged) {
        formData.append("image", logoFile);
        try {
          await axios.post(
            `${process.env.REACT_APP_BACK_URL}/information/logo`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
              },
            }
          );
        } catch {
          setIsLoading(false);
          setModal({ title: "ERROR", message: error.response.data.message });
        }
      }
      setModal({ title: "CORRECTO", message: response.data.message });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={saveData}>
      <MainContainer
        title="Información"
        buttonTitle="Guardar"
        type="submit"
        style={{ bottom: "auto" }}
      >
        <SubContainer subTitle="INFO PERSONAL">
          <Card
            type="textBig"
            label="Nombre de la intitución"
            value={information.name ?? ""}
            maxLength="150"
            onChange={(event) => {
              setInformation({ ...information, name: event.target.value });
            }}
            setError={setErrorName}
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Director/a"
            value={information.director_name ?? ""}
            maxLength="35"
            onChange={(event) => {
              setInformation({
                ...information,
                director_name: event.target.value,
              });
            }}
            setError={setErrorSecretary}
            validation="text"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Secretario/a"
            value={information.secretary_name ?? ""}
            maxLength="35"
            onChange={(event) => {
              setInformation({
                ...information,
                secretary_name: event.target.value,
              });
            }}
            setError={setErrorDirector}
            validation="text"
            must
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="Logo de la institución">
          <Card
            value={information.logo}
            // maxLength="20"
            type="image"
            onChange={(image) => {
              setLogoChanged(true);
              setInformation((prevState) => {
                return { ...prevState, logo: image.base64 };
              });
              setLogoFile(image.file);
            }}
            setError={setErrorLogo}
            validation="image"
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default Information;
