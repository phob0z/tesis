import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";

function NewStudent() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    avatar: "https://www.hallmarktour.com/img/profile-img.jpg",
  });
  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  // const [avatarFile, setAvatarFile] = useState();
  // const [avatarChanged, setAvatarChanged] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorIdentification, setErrorIdentification] = useState(false);
  const [errorBirthdate, setErrorBirthdate] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorHomePhone, setErrorHomePhone] = useState(false);
  const [errorPersonalPhone, setErrorPersonalPhone] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorRepreName, setErrorRepreName] = useState(false);
  const [errorRepreLastName, setErrorRepreLastName] = useState(false);
  const [errorRepreIdentification, setErrorRepreIdentification] =
    useState(false);
  const [errorReprePersonalPhone, setErrorReprePersonalPhone] = useState(false);
  const [error, setError] = useState(false);

  const [filters, setFilters] = useState([]);

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
  ]);

  const fetchFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/filter`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const courses = response.data.data.courses;
      const parallels = response.data.data.parallels;
      const specialties = response.data.data.specialties;
      const academicYears = response.data.data.periods;
      setFilters({ courses, parallels, specialties, academicYears });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

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
        `${process.env.REACT_APP_BACK_URL}/student/create`,
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
          course_id: student.course_id,
          parallel_id: student.parallel_id,
          specialty_id: student.specialty_id,
          academic_period_id: student.academic_period_id,
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
      navigate("../");
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
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
            maxLength="35"
            onChange={(event) => {
              setStudent({ ...student, name: event.target.value });
            }}
            setError={setErrorName}
            validation="text"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Apellidos"
            value={student.last_name}
            maxLength="35"
            onChange={(event) => {
              setStudent({ ...student, last_name: event.target.value });
            }}
            setError={setErrorLastName}
            validation="text"
            must
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
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Fecha de nacimiento"
            value={student.birthdate}
            maxLength="10"
            type="date"
            onChange={(date) => {
              setStudent({ ...student, birthdate: date });
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
            value={student.email}
            maxLength="50"
            onChange={(event) => {
              setStudent({ ...student, email: event.target.value });
            }}
            setError={setErrorEmail}
            validation="email"
            must
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
            must
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
            must
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
            validation="address"
            must
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="DATOS DEL REPRESENTANTE">
          <Card
            label="Nombres"
            value={student.representative_name}
            maxLength="35"
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
            maxLength="35"
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
            maxLength="10"
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
        {/* <SubContainer subTitle="IMAGEN DE PERFIL">
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
        </SubContainer> */}
        <SubContainer subTitle="DATOS DE LA MATRÍCULA">
          <Card
            label="Curso"
            type="select"
            options={filters.courses}
            theme="simple"
            value={student.course_id}
            onChange={(event) => {
              setStudent({ ...student, course_id: event.target.value });
            }}
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Paralelo"
            type="select"
            options={filters.parallels}
            theme="simple"
            value={student.parallel_id}
            onChange={(event) => {
              setStudent({ ...student, parallel_id: event.target.value });
            }}
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Especialidad"
            type="select"
            options={filters.specialties}
            theme="simple"
            value={student.specialty_id}
            onChange={(event) => {
              setStudent({ ...student, specialty_id: event.target.value });
            }}
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Periodo"
            type="select"
            options={filters.academicYears}
            theme="simple"
            value={student.academic_period_id}
            onChange={(event) => {
              setStudent({ ...student, academic_period_id: event.target.value });
            }}
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default NewStudent;
