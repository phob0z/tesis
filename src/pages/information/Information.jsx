import React, { useCallback, useContext, useEffect, useState } from "react";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";
import AuthContext from "../../contexts/auth/AuthContext";

function Information() {
  const { setIsLoading, setModal } = useContext(AlertContext);
  
  const { user, token } = useContext(AuthContext);

  const [information, setInformation] = useState({});
  const [errorName, setErrorName] = useState(false);
  const [errorSecretary, setErrorSecretary] = useState(false);
  const [errorDirector, setErrorDirector] = useState(false);
  const [errorLogo, setErrorLogo] = useState(false);
  const [error, setError] = useState(false);

  const fetchInformation = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      const data = {
        name: "Miguel de Santiago",
        director: "Juanita Perez",
        secretary: "Juanito Perez",
        logo: "http://www.quitoinforma.gob.ec/wp-content/uploads/2019/05/logoquito-1-800x445.png",
      };
      setInformation(data);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal]);

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
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={saveData}>
      <MainContainer title="Información" buttonTitle="Guardar" type="submit" style={{bottom: "auto"}}>
        <SubContainer subTitle="INFO PERSONAL">
          <Card
            label="Nombre de la intitución"
            value={information.name}
            maxLength="40"
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
            maxLength="35"
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
        <SubContainer subTitle="Logo de la institución">
          <Card
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
