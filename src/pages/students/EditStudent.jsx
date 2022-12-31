import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function EditStudent() {
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

  const [filters, setFilters] = useState([]);

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
  // const [errorPassword, setErrorPassword] = useState(false);
  const [errorRepreName, setErrorRepreName] = useState(false);
  const [errorRepreLastName, setErrorRepreLastName] = useState(false);
  const [errorRepreIdentification, setErrorRepreIdentification] =
    useState(false);
  const [errorReprePersonalPhone, setErrorReprePersonalPhone] = useState(false);
  const [error, setError] = useState(false);

  // const [newPassword, setNewPassword] = useState("");
  // const [confirmation, setConfirmation] = useState("");

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
      : errorRepreName.error
      ? setError(errorRepreName)
      : errorRepreLastName.error
      ? setError(errorRepreLastName)
      : errorRepreIdentification.error
      ? setError(errorRepreIdentification)
      : errorReprePersonalPhone.error
      ? setError(errorReprePersonalPhone)
      : setError(false);

    // errorPassword.error
    //   ? setErrorPassword(errorPassword)
    //   : setErrorPassword(false);
  }, [
    errorName,
    errorLastName,
    errorIdentification,
    errorBirthdate,
    errorEmail,
    errorHomePhone,
    errorPersonalPhone,
    errorAddress,
    errorRepreName,
    errorRepreLastName,
    errorRepreIdentification,
    errorReprePersonalPhone,
    // errorPassword,
  ]);

  const fetchStudent = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      const data = {
        name: "Leonel",
        last_name: "Molina",
        personal_phone: "0963680605",
        home_phone: "022454236",
        address: "Quito",
        email: "leonel_alfonso@hotmail.com",
        identification: "1758963050",
        birthdate: "1988/06/18",
        avatar: "https://www.hallmarktour.com/img/profile-img.jpg",
        representative_name: "Laudin",
        representative_last_name: "Molina",
        representative_identification: "2459690",
        representative_phone: "0982513230",
        course: "8vo",
        parallel: "C",
      };
      setStudent(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
    }
  }, [setIsLoading, setModal, token]);

  const fetchFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      const data = {
        course: ["1ero", "8vo", "9no", "10mo"],
        parallel: ["A", "B", "C", "D"],
      };
      setFilters(data);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal]);

  useEffect(() => {
    fetchStudent();
    fetchFilters();
  }, [fetchStudent, fetchFilters]);

  // const changePassword = async () => {
  //   if (errorPassword.error || !newPassword || newPassword !== confirmation) {
  //     setModal({
  //       title: "Error en CAMBIAR CONTRASEÑA",
  //       message: errorPassword
  //         ? errorPassword.error
  //         : !newPassword
  //         ? "La contraseña es vacía"
  //         : "Las contraseñas no coinciden",
  //     });
  //     return;
  //   }
  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_BACK_URL}/update-password`,
  //       { password: newPassword, password_confirmation: confirmation },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     setIsLoading(false);
  //     setModal({ title: "CORRECTO", message: response.data.message });
  //     setNewPassword("");
  //     setConfirmation("");
  //   } catch (error) {
  //     setIsLoading(false);
  //     setModal({ title: "ERROR", message: error.response.data.message });
  //   }
  // };

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
          identification: student.identification,
          birthdate: student.birthdate,
          email: student.email,
          home_phone: student.home_phone,
          personal_phone: student.personal_phone,
          address: student.address,
          representative_name: student.representative_name,
          representative_last_name: student.representative_last_name,
          representative_identification: student.representative_identification,
          representative_phone: student.representative_phone,
          course: student.course,
          parallel: student.parallel,
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
        title="Editar estudiante"
        buttonTitle="Guardar"
        type="submit"
        backButton
        addSubjectButton
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
            label="Teléfono fijo"
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
        <SubContainer subTitle="DATOS DEL REPRESENTANTE">
          <Card
            label="Nombres"
            value={student.representative_name}
            maxLength="50"
            onChange={(event) => {
              setStudent({
                ...student,
                representative_name: event.target.value,
              });
            }}
            setError={setErrorRepreName}
            validation="text"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Apellidos"
            value={student.representative_last_name}
            maxLength="50"
            onChange={(event) => {
              setStudent({
                ...student,
                representative_last_name: event.target.value,
              });
            }}
            setError={setErrorRepreLastName}
            validation="text"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Identificación"
            value={student.representative_identification}
            maxLength="15"
            onChange={(event) => {
              setStudent({
                ...student,
                representative_identification: event.target.value,
              });
            }}
            setError={setErrorRepreIdentification}
            validation="identification"
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono celular"
            value={student.representative_phone}
            maxLength="15"
            onChange={(event) => {
              setStudent({
                ...student,
                representative_phone: event.target.value,
              });
            }}
            setError={setErrorReprePersonalPhone}
            validation="personalPhone"
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
        <SubContainer subTitle="DATOS DE LA MATRÍCULA">
          <Card
            label="Curso"
            type="select"
            options={filters.course}
            theme="simple"
            value={student.course}
            onChange={(event) => {
              setStudent({ ...student, course: event.target.value });
            }}
          />
          <Card
            label="Paralelo"
            type="select"
            options={filters.parallel}
            theme="simple"
            value={student.parallel}
            onChange={(event) => {
              setStudent({ ...student, parallel: event.target.value });
            }}
          />
        </SubContainer>
        {/* <SubContainer
          subTitle="CAMBIAR CONTRASEÑA"
          buttonTitle="Cambiar"
          onClick={changePassword}
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
        </SubContainer> */}
      </MainContainer>
    </form>
  );
}

export default EditStudent;
