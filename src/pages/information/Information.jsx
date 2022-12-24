import React, { useCallback, useContext, useEffect, useState } from "react";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/atoms/Card";

function Information() {
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [information, setInformation] = useState({});
  const [errorName, setErrorName] = useState(false);
  const [errorSecretary, setErrorSecretary] = useState(false);
  const [errorDirector, setErrorDirector] = useState(false);
  const [errorLogo, setErrorLogo] = useState(false);
  const [error, setError] = useState(false);

  const fetchInformation = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Information/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      const Information = {
        name: "Miguel de Santiago",
        director: "Juanita Perez",
        secretary: "Juanito Perez",
        logo: "http://www.quitoinforma.gob.ec/wp-content/uploads/2019/05/logoquito-1-800x445.png",
      };
      setInformation({ ...Information });
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
      setHasError(true);
    }
    setIsLoading(false);
  }, [setHasError, setIsLoading, setModal]);

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

  const saveInformation = (event) => {
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
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Information/`,
      //   { method: "POST" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
    setIsLoading(false);
    console.log("TODO CORRECTO, guardar");
    setInformation(information);
  };

  return (
    <form onSubmit={saveInformation}>
      <MainContainer title="Perfil" buttonTitle="Guardar" type="submit">
        <SubContainer subTitle="INFO PERSONAL">
          <Card
            label="Nombre de la intitución"
            value={information.name}
            maxLength="30"
            onChange={(event) => {
              setInformation({ ...information, name: event.target.value });
            }}
            setError={setErrorName}
            validation="text"
            // disabled={user.role !== "secretary"}
          />
          <Card
            label="Director/a"
            value={information.director}
            maxLength="35"
            onChange={(event) => {
              setInformation({ ...information, director: event.target.value });
            }}
            setError={setErrorSecretary}
            validation="text"
            // disabled={user.role !== "secretary"}
          />
          <Card
            label="Secretario/a"
            value={information.secretary}
            maxLength="20"
            onChange={(event) => {
              setInformation({
                ...information,
                secretary: event.target.value,
              });
            }}
            setError={setErrorDirector}
            validation="text"
            // disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="Logo">
          <Card
            label="Logo de la institución"
            value={information.logo}
            // maxLength="20"
            type="image"
            onChange={(image) => {
              setInformation({ ...information, logo: image });
            }}
            setError={setErrorLogo}
            validation="image"
            // disabled={user.role !== "secretary"}
          />
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default Information;
