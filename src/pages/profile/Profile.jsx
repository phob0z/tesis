import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/atoms/Card";

function Profile() {
  const { user, token, setProfile } = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [userProfile, setUserProfile] = useState({ user });
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [avatarFile, setAvatarFile] = useState();
  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorIdentification, setErrorIdentification] = useState(false);
  const [errorBirthdate, setErrorBirthdate] = useState(false);
  const [errorAvatar, setErrorAvatar] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorHomePhone, setErrorHomePhone] = useState(false);
  const [errorPersonalPhone, setErrorPersonalPhone] = useState(false);
  const [errorDirection, setErrorDirection] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [error, setError] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const { user, avatar } = response.data.data;
      setUserProfile({ ...user, avatar: avatar });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
  }, [setHasError, setIsLoading, setModal, token]);

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
      : errorAvatar.error
      ? setError(errorAvatar)
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
    errorAvatar,
    errorEmail,
    errorHomePhone,
    errorPersonalPhone,
    errorDirection,
    errorPassword,
  ]);

  const changePassword = async () => {
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
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/update-password`,
        { password: newPassword, password_confirmation: confirmation },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      setIsLoading(false);
      setModal({ title: "CORRECTO", message: response.data.message });
      setHasError(true);
      setNewPassword("");
      setConfirmation("");
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
  };

  const saveProfile = async (event) => {
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
      var formData = new FormData();
      formData.append("image", avatarFile);

      const response = await axios
        .post(
          `${process.env.REACT_APP_BACK_URL}/profile`,
          {
            name: userProfile.name,
            last_name: userProfile.last_name,
            personal_phone: userProfile.personal_phone,
            home_phone: userProfile.home_phone,
            address: userProfile.address,
            email: userProfile.email,
            identification: userProfile.identification,
            birthdate: userProfile.birthdate,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token,
            },
          }
        )
        .then(
          await axios.post(
            `${process.env.REACT_APP_BACK_URL}/profile/avatar`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
              },
            }
          )
        );
      setIsLoading(false);
      setModal({ title: "CORRECTO", message: response.data.message });
      setHasError(true);
      setProfile({ ...userProfile });
      user.avatar = userProfile.avatar;
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
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
          <Card
            label="Imagen de perfil"
            value={user.avatar}
            type="image"
            onChange={(image) => {
              setUserProfile({ ...userProfile, avatar: image.base64 });
              setAvatarFile(image.file);
            }}
            setError={setErrorAvatar}
            validation="image"
            alt={`Imagen de ${user.name} ${user.last_name}`}
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
            type="textBig"
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
            label="Nueva contraseña"
            value={newPassword}
            maxLength="50"
            validation="changePassword"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
            setError={setErrorPassword}
            type="password"
            showRevealPassword
          />
          <Card
            label="Confirmar contraseña"
            value={confirmation}
            maxLength="50"
            validation="changePassword"
            onChange={(event) => {
              setConfirmation(event.target.value);
            }}
            setError={setErrorPassword}
            type="password"
            showRevealPassword
          />
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default Profile;
