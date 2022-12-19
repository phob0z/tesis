import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/templates/container/MainContainer";
import SubContainer from "../../components/templates/container/SubContainer";
import Card from "../../components/atoms/Card";

function ProfileSecretary() {
  const { user, setProfile } = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [newPassword, setNewPassword] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorIdentification, setErrorIdentification] = useState(false);
  const [errorBirthdate, setErrorBirthdate] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorHomePhone, setErrorHomePhone] = useState(false);
  const [errorPersonalPhone, setErrorPersonalPhone] = useState(false);
  const [errorDirection, setErrorDirection] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // const [error, setError] = useState({label: false, error: false});
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(
      errorName ||
        errorLastName ||
        errorIdentification ||
        errorBirthdate ||
        errorEmail ||
        errorHomePhone ||
        errorPersonalPhone ||
        errorDirection
    );
    console.log(error);
  }, [
    errorName,
    errorLastName,
    errorIdentification,
    errorBirthdate,
    errorEmail,
    errorHomePhone,
    errorPersonalPhone,
    errorDirection,
  ]);

  const changePassword = () => {
    if (!passwordError && newPassword && newPassword === confirmation) {
      console.log("Change password");
    } else {
      console.log(
        "MODAL con error del problema del password (vacio/error/no son iguales"
      );
    }
  };

  const saveProfile = (event) => {
    event.preventDefault();
    if (error.error) {
      setModal({
        title: `Error en ${error.label}`,
        message: error.error,
      });
      setHasError(true);
      return;
    }
    setIsLoading(true);

    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/login`,
      //   // "http://localhost:8000/api/login",
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
    setProfile(user);
  };

  return (
    <form onSubmit={saveProfile}>
      <MainContainer title="Perfil" buttonText="Guardar" type="submit">
        <SubContainer subTitle="INFO PERSONAL">
          <Card
            label="Nombres"
            value={user.name}
            maxLength="35"
            onChange={(event) => {
              user.name = event.target.value;
            }}
            setError={setErrorName}
            validation="text"
          />
          <Card
            label="Apellidos"
            value={user.last_name}
            maxLength="35"
            onChange={(event) => {
              user.last_name = event.target.value;
            }}
            setError={setErrorLastName}
            validation="text"
          />
          <Card
            label="Identificación"
            value={user.identification}
            maxLength="20"
            onChange={(event) => {
              user.identification = event.target.value;
            }}
            setError={setErrorIdentification}
            validation="identification"
          />
          <Card
            label="Fecha de nacimiento"
            value={user.birthdate}
            maxLength="20"
            onChange={(event) => {
              user.birthdate = event.target.value;
            }}
            setError={setErrorBirthdate}
            validation="date"
          />
        </SubContainer>
        <SubContainer subTitle="INFO DE CONTACTO">
          <Card
            label="Correo"
            value={user.email}
            maxLength="20"
            onChange={(event) => {
              user.email = event.target.value;
            }}
            setError={setErrorEmail}
            validation="email"
          />
          <Card
            label="Teléfono convencional"
            value={user.home_phone}
            maxLength="9"
            onChange={(event) => {
              user.home_phone = event.target.value;
            }}
            setError={setErrorHomePhone}
            validation="homePhone"
          />
          <Card
            label="Teléfono celular"
            value={user.personal_phone}
            maxLength="10"
            onChange={(event) => {
              user.personal_phone = event.target.value;
            }}
            setError={setErrorPersonalPhone}
            validation="personalPhone"
          />
          <Card
            label="Dirección"
            value={user.address}
            maxLength="50"
            onChange={(event) => {
              user.address = event.target.value;
            }}
            setError={setErrorDirection}
          />
        </SubContainer>
        <SubContainer
          buttonTitle="Cambiar"
          onClick={changePassword}
          subTitle="CAMBIAR CONTRASEÑA"
        >
          <Card
            type="password"
            showRevealPassword
            label="Nueva contraseña"
            maxLength="50"
            validation="changePassword"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
            setError={setPasswordError}
          />
          <Card
            type="password"
            showRevealPassword
            label="Confirmar contraseña"
            maxLength="50"
            validation="changePassword"
            onChange={(event) => {
              setConfirmation(event.target.value);
            }}
            setError={setPasswordError}
          />
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default ProfileSecretary;
