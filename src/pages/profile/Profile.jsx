import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function Profile() {
  const { user, token, setProfile } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [userProfile, setUserProfile] = useState({ user });
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [avatarFile, setAvatarFile] = useState();
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorIdentification, setErrorIdentification] = useState(false);
  const [errorBirthdate, setErrorBirthdate] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorHomePhone, setErrorHomePhone] = useState(false);
  const [errorPersonalPhone, setErrorPersonalPhone] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
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
      console.log(user);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token]);

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
      : errorAddress.error
      ? setError(errorAddress)
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
    errorAddress,
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
      setModal({ title: "CORRECTO", message: response.data.message });
      setNewPassword("");
      setConfirmation("");
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  const saveProfile = async (event) => {
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
      );

      var formData = new FormData();
      if (avatarChanged) {
        formData.append("image", avatarFile);
        try {
          await axios.post(
            `${process.env.REACT_APP_BACK_URL}/profile/avatar`,
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
      setProfile({ ...userProfile });
      user.avatar = userProfile.avatar;
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={saveProfile}>
      <MainContainer
        title="Perfil"
        buttonTitle="Guardar"
        type="submit"
        subjectButton={user.role !== "secretary" ? "/grades" : false}
      >
        <SubContainer subTitle="INFO PERSONAL">
          <Card
            label="Nombres"
            value={userProfile.name ?? ""}
            maxLength="50"
            onChange={(event) => {
              setUserProfile({ ...userProfile, name: event.target.value });
            }}
            setError={setErrorName}
            validation="text"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Apellidos"
            value={userProfile.last_name ?? ""}
            maxLength="50"
            onChange={(event) => {
              setUserProfile({ ...userProfile, last_name: event.target.value });
            }}
            setError={setErrorLastName}
            validation="text"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Identificación"
            value={userProfile.identification ?? ""}
            maxLength="15"
            onChange={(event) => {
              setUserProfile({
                ...userProfile,
                identification: event.target.value,
              });
            }}
            setError={setErrorIdentification}
            validation="identification"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Fecha de nacimiento"
            value={userProfile.birthdate ?? ""}
            maxLength="10"
            type="date"
            onChange={(date) => {
              setUserProfile({ ...userProfile, birthdate: date });
            }}
            minDate="-100"
            maxDate="-10"
            setError={setErrorBirthdate}
            validation="date"
            must
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="INFO DE CONTACTO">
          <Card
            label="Correo"
            value={userProfile.email ?? ""}
            maxLength="50"
            onChange={(event) => {
              setUserProfile({ ...userProfile, email: event.target.value });
            }}
            setError={setErrorEmail}
            validation="email"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono fijo"
            value={userProfile.home_phone ?? ""}
            maxLength="9"
            onChange={(event) => {
              setUserProfile({
                ...userProfile,
                home_phone: event.target.value,
              });
            }}
            setError={setErrorHomePhone}
            validation="homePhone"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono celular"
            value={userProfile.personal_phone ?? ""}
            maxLength="10"
            onChange={(event) => {
              setUserProfile({
                ...userProfile,
                personal_phone: event.target.value,
              });
            }}
            setError={setErrorPersonalPhone}
            validation="personalPhone"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            type="textBig"
            label="Dirección"
            value={userProfile.address ?? ""}
            maxLength="150"
            onChange={(event) => {
              setUserProfile({ ...userProfile, address: event.target.value });
            }}
            setError={setErrorAddress}
            validation="address"
            must
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="IMAGEN DE PERFIL">
          <Card
            value={userProfile.avatar}
            type="image"
            onChange={(image) => {
              setAvatarChanged(true);
              setUserProfile({ ...userProfile, avatar: image.base64 });
              setAvatarFile(image.file);
            }}
            validation="image"
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
            maxLength="30"
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
            maxLength="30"
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
