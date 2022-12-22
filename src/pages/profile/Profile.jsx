import React, { useCallback, useContext, useEffect, useState } from "react";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/atoms/Card";

function Profile() {
  const { user, setProfile } = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [userProfile, setUserProfile] = useState({ user });
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
  const [errorPassword, setErrorPassword] = useState(false);
  const [error, setError] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/profile/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      // eslint-disable-next-line
      const data = await response.json();
      const profile = {
        name: "Leonel",
        last_name: "Molina",
        identification: "1758963050",
        birthdate: "1988-06-18",
        email: "leonel@gmail.com",
        home_phone: "123456789",
        personal_phone: "1234567890",
        address: "Quito",
      };
      setUserProfile({ ...user, ...profile });
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
      setHasError(true);
    }
    setIsLoading(false);
  }, [setHasError, setIsLoading, setModal, user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    errorName.error
      ? setError(errorName)
      : errorLastName.error
      ? setError(errorLastName)
      : errorIdentification.error
      ? setError(errorIdentification)
      : errorBirthdate.error
      ? setError(errorBirthdate)
      : errorEmail.error
      ? setError(errorEmail)
      : errorHomePhone.error
      ? setError(errorHomePhone)
      : errorPersonalPhone.error
      ? setError(errorPersonalPhone)
      : errorDirection.error
      ? setError(errorDirection)
      : setError(false);

    errorPassword.error
      ? setErrorPassword(errorPassword)
      : setErrorPassword(false);
  }, [
    errorName,
    errorLastName,
    errorIdentification,
    errorBirthdate,
    errorEmail,
    errorHomePhone,
    errorPersonalPhone,
    errorDirection,
    errorPassword,
  ]);

  const changePassword = () => {
    if (errorPassword.error || !newPassword || newPassword !== confirmation) {
      setModal({
        title: "Error en CAMBIAR CONTRASEÑA",
        message: errorPassword
          ? errorPassword.error
          : !newPassword
          ? "La contraseña es vacía"
          : "Las contraseñas no coinciden",
      });
      setHasError(true);
      return;
    }
    setIsLoading(true);

    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/change-password/`,
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
    console.log("TODO CORRECTO, Cambiar password");
  };

  const saveProfile = (event) => {
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
      //   `${process.env.REACT_APP_BACK_URL}/profile/`,
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
      <MainContainer title="Perfil" buttonTitle="Guardar" type="submit">
        <SubContainer subTitle="INFO PERSONAL">
          <Card
            label="Nombres"
            value={userProfile.name}
            maxLength="35"
            onChange={(event) => {
              setUserProfile({ ...userProfile, name: event.target.value });
            }}
            setError={setErrorName}
            validation="text"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Apellidos"
            value={userProfile.last_name}
            maxLength="35"
            onChange={(event) => {
              setUserProfile({ ...userProfile, last_name: event.target.value });
            }}
            setError={setErrorLastName}
            validation="text"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Identificación"
            value={userProfile.identification}
            maxLength="20"
            onChange={(event) => {
              setUserProfile({
                ...userProfile,
                identification: event.target.value,
              });
            }}
            setError={setErrorIdentification}
            validation="identification"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Fecha de nacimiento"
            value={userProfile.birthdate}
            maxLength="20"
            type="date"
            onChange={(event) => {
              setUserProfile({ ...userProfile, birthdate: event.target.value });
            }}
            setError={setErrorBirthdate}
            validation="date"
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="INFO DE CONTACTO">
          <Card
            label="Correo"
            value={userProfile.email}
            maxLength="20"
            onChange={(event) => {
              setUserProfile({ ...userProfile, email: event.target.value });
            }}
            setError={setErrorEmail}
            validation="email"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono convencional"
            value={userProfile.home_phone}
            maxLength="9"
            onChange={(event) => {
              setUserProfile({
                ...userProfile,
                home_phone: event.target.value,
              });
            }}
            setError={setErrorHomePhone}
            validation="homePhone"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono celular"
            value={userProfile.personal_phone}
            maxLength="10"
            onChange={(event) => {
              setUserProfile({
                ...userProfile,
                personal_phone: event.target.value,
              });
            }}
            setError={setErrorPersonalPhone}
            validation="personalPhone"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Dirección"
            value={userProfile.address}
            maxLength="50"
            onChange={(event) => {
              setUserProfile({ ...userProfile, address: event.target.value });
            }}
            setError={setErrorDirection}
            disabled={user.role !== "secretary"}
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
            setError={setErrorPassword}
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
            setError={setErrorPassword}
          />
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default Profile;
