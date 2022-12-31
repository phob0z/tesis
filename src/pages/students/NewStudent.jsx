import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function NewStudent() {
  const [student, setStudent] = useState({
    name: "",
    last_name: "",
    identification: "",
    birthdate: "",
    email: "",
    home_phone: "",
    personal_phone: "",
    address: "",
    avatar: "https://www.hallmarktour.com/img/profile-img.jpg",
  });
  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

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
  const [error, setError] = useState(false);

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
  }, [
    errorName,
    errorLastName,
    errorIdentification,
    errorBirthdate,
    errorEmail,
    errorHomePhone,
    errorPersonalPhone,
    errorAddress,
  ]);

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
        `${process.env.REACT_APP_BACK_URL}/student`,
        {
          name: student.name,
          last_name: student.last_name,
          personal_phone: student.personal_phone,
          home_phone: student.home_phone,
          address: student.address,
          email: student.email,
          identification: student.identification,
          birthdate: student.birthdate,
          role: "student",
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
          const response = await axios.post(
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
      setIsLoading(false);
      setModal({ title: "CORRECTO", message: response.data.message });
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
    }
  };

  return (
    <form onSubmit={saveProfile}>
      <MainContainer
        title="Nuevo estudiante"
        buttonTitle="Guardar"
        type="submit"
        backButton
      >
        <SubContainer subTitle="INFO PERSONAL">
          <Card
            label="Nombres"
            value={student.name}
            maxLength="50"
            onChange={(event) => {
              setStudent({ ...student, name: event.target.value });
            }}
            setError={setErrorName}
            validation="text"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Apellidos"
            value={student.last_name}
            maxLength="50"
            onChange={(event) => {
              setStudent({ ...student, last_name: event.target.value });
            }}
            setError={setErrorLastName}
            validation="text"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Identificación"
            value={student.identification}
            maxLength="15"
            onChange={(event) => {
              setStudent({
                ...student,
                identification: event.target.value,
              });
            }}
            setError={setErrorIdentification}
            validation="identification"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Fecha de nacimiento"
            value={student.birthdate}
            maxLength="10"
            type="date"
            onChange={(event) => {
              setStudent({ ...student, birthdate: event.target.value });
            }}
            setError={setErrorBirthdate}
            validation="date"
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="INFO DE CONTACTO">
          <Card
            label="Correo"
            value={student.email}
            maxLength="50"
            onChange={(event) => {
              setStudent({ ...student, email: event.target.value });
            }}
            setError={setErrorEmail}
            validation="email"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono convencional"
            value={student.home_phone}
            maxLength="9"
            onChange={(event) => {
              setStudent({
                ...student,
                home_phone: event.target.value,
              });
            }}
            setError={setErrorHomePhone}
            validation="homePhone"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono celular"
            value={student.personal_phone}
            maxLength="10"
            onChange={(event) => {
              setStudent({
                ...student,
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
            value={student.address}
            maxLength="150"
            onChange={(event) => {
              setStudent({ ...student, address: event.target.value });
            }}
            setError={setErrorAddress}
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="IMAGEN DE PERFIL">
        <Card
            value={student.avatar}
            type="image"
            onChange={(image) => {
              setAvatarChanged(true);
              setStudent({ ...student, avatar: image.base64 });
              setAvatarFile(image.file);
            }}
            validation="image"
            // disabled={user.role !== "secretary"}
          />
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default NewStudent;
