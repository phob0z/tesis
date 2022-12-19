import React, { useContext, useEffect } from "react";

import Card from "../../components/atoms/Card";
import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import AlertContext from "../../contexts/alert/AlertContext";

function Information() {
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  useEffect(() => {
    console.log("Load for the first time");
  }, [])

  const saveInformation = (event) => {
    event.preventDefault();
    console.log("Guardar información");
  };

  return (
    <form onSubmit={saveInformation}>
      <MainContainer title="Información" buttonTitle="Guardar" type="submit">
        <SubContainer subTitle="INFORMACIÓN ADMINISTRATIVA">
          {/* <Card
            label="Secretaria"
            value={user.name}
            maxLength="35"
            onChange={(event) => {
              user.name = event.target.value;
            }}
            setError={setErrorName}
            validation="text"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Directora"
            value={user.last_name}
            maxLength="35"
            onChange={(event) => {
              user.last_name = event.target.value;
            }}
            setError={setErrorLastName}
            validation="text"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Mensaje"
            value={user.identification}
            maxLength="20"
            onChange={(event) => {
              user.identification = event.target.value;
            }}
            setError={setErrorIdentification}
            validation="identification"
            disabled={user.role !== "secretary"}
          /> */}
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default Information;
