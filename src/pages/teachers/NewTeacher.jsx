import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function NewTeacher() {
  const [teacher, setTeacher] = useState({});
  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

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
        `${process.env.REACT_APP_BACK_URL}/teacher/create`,
        {
          name: teacher.name,
          last_name: teacher.last_name,
          identification: teacher.identification,
          birthdate: teacher.birthdate,
          email: teacher.email,
          home_phone: teacher.home_phone,
          personal_phone: teacher.personal_phone,
          address: teacher.address,
          // role: "teacher",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );

      // var formData = new FormData();
      // if (avatarChanged) {
      //   formData.append("image", avatarFile);
      //   try {
      //     await axios.post(
      //       `${process.env.REACT_APP_BACK_URL}/profile/avatar`,
      //       formData,
      //       {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //           Authorization: token,
      //         },
      //       }
      //     );
      //   } catch {
      //     setModal({ title: "ERROR", message: error.response.data.message });
      //   }
      // }
      setModal({ title: "CORRECTO", message: response.data.message });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={saveProfile}>
      <MainContainer
        title="Nuevo profesor"
        buttonTitle="Guardar"
        type="submit"
        backButton
      >
        <SubContainer subTitle="INFO PERSONAL">
          <Card
            label="Nombres"
            value={teacher.name ?? ""}
            maxLength="35"
            onChange={(event) => {
              setTeacher({ ...teacher, name: event.target.value });
            }}
            setError={setErrorName}
            validation="text"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Apellidos"
            value={teacher.last_name ?? ""}
            maxLength="35"
            onChange={(event) => {
              setTeacher({ ...teacher, last_name: event.target.value });
            }}
            setError={setErrorLastName}
            validation="text"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Identificación"
            value={teacher.identification ?? ""}
            maxLength="15"
            onChange={(event) => {
              setTeacher({
                ...teacher,
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
            value={teacher.birthdate ?? ""}
            maxLength="10"
            type="date"
            onChange={(date) => {
              setTeacher({ ...teacher, birthdate: date });
            }}
            setError={setErrorBirthdate}
            validation="date"
            minDate="-100"
            maxDate="-10"
            must
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="INFO DE CONTACTO">
          <Card
            label="Correo"
            value={teacher.email ?? ""}
            maxLength="50"
            onChange={(event) => {
              setTeacher({ ...teacher, email: event.target.value });
            }}
            setError={setErrorEmail}
            validation="email"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono fijo"
            value={teacher.home_phone ?? ""}
            maxLength="9"
            onChange={(event) => {
              setTeacher({
                ...teacher,
                home_phone: event.target.value,
              });
            }}
            setError={setErrorHomePhone}
            validation="homePhone"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono celular"
            value={teacher.personal_phone ?? ""}
            maxLength="10"
            onChange={(event) => {
              setTeacher({
                ...teacher,
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
            value={teacher?.address ?? ""}
            maxLength="150"
            onChange={(event) => {
              setTeacher({ ...teacher, address: event.target.value });
            }}
            setError={setErrorAddress}
            validation="address"
            must
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        {/* <SubContainer subTitle="IMAGEN DE PERFIL">
          <Card
            value={teacher?.avatar}
            type="image"
            onChange={(image) => {
              setAvatarChanged(true);
              setTeacher({ ...teacher, avatar: image.base64 });
              setAvatarFile(image.file);
            }}
            validation="image"
            // disabled={user.role !== "secretary"}
          />
        </SubContainer> */}
      </MainContainer>
    </form>
  );
}

export default NewTeacher;
