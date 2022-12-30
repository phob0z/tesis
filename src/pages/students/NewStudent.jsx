import React, { useContext, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function NewStudent() {
  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [userProfile, setUserProfile] = useState({ user });

  return (
    <MainContainer
      title="Nuevo estudiante"
      buttonTitle="Guardar"
      type="submit"
      backButton
    >
      <SubContainer subTitle="INFO PERSONAL">
        <Card
          label="Identificación"
          value={userProfile.identification}
          maxLength="15"
          onChange={(event) => {
            setUserProfile({
              ...userProfile,
              identification: event.target.value,
            });
          }}
          validation="identification"
          disabled={user.role !== "secretary"}
        />
      </SubContainer>
    </MainContainer>
  );
}

export default NewStudent;
