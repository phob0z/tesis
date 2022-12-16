import React, { Fragment, useContext } from "react";
import Card from "../components/atoms/Card";
import AuthContext from "../contexts/auth/AuthContext";
import MainContainer from "../components/templates/MainContainer";
import SubContainer from "../components/templates/SubContainer";

function ProfileTeacher() {
  const { user } = useContext(AuthContext);
  return (
    <MainContainer title="Perfil">
      <SubContainer>
        INFO PERSONAL
        <Card theme="simple" label="Nombres" value={user.name} maxLength="35" />
        <Card
          theme="simple"
          label="Apellidos"
          value={user.last_name}
          maxLength="35"
        />
        <Card
          theme="simple"
          label="Cédula"
          value={user.identification}
          maxLength="20"
        />
        <Card
          theme="simple"
          label="Fecha de nacimiento"
          value={user.birthdate}
          maxLength="20"
        />
      </SubContainer>
      <SubContainer>
        INFO DE CONTACTO
        <Card theme="simple" label="Correo" value={user.email} maxLength="20" />
        <Card
          theme="simple"
          label="Teléfono convencional"
          value={user.home_phone}
          maxLength="9"
        />
        <Card
          theme="simple"
          label="Teléfono celular"
          value={user.personal_phone}
          maxLength="10"
        />
        <Card
          theme="simple"
          label="Dirección"
          value={user.address}
          maxLength="50"
        />
      </SubContainer>
      <SubContainer>
        CAMBIAR CONTRASEÑA
        <Card
          theme="simple"
          type="password"
          showRevealPassword
          label="Cambiar contraseña"
          maxLength="50"
        />
        <Card
          theme="simple"
          type="password"
          showRevealPassword
          label="Confirmar contraseña"
          maxLength="50"
        />
      </SubContainer>
    </MainContainer>
  );
}

export default ProfileTeacher;
