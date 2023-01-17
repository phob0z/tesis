import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";
import OnOffInput from "../../components/atoms/OnOffInput";

function EditStudent() {
  const params = useParams();
  const [student, setStudent] = useState({
    avatar: "",
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
  const [errorRepreName, setErrorRepreName] = useState(false);
  const [errorRepreLastName, setErrorRepreLastName] = useState(false);
  const [errorRepreIdentification, setErrorRepreIdentification] =
    useState(false);
  const [errorReprePersonalPhone, setErrorReprePersonalPhone] = useState(false);
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

  const fetchStudent = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/student/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const avatar = response.data.data.avatar;
      // eslint-disable-next-line
      Object.keys(response.data.data.user).map((key) => {
        response.data.data.user[key] = response.data.data.user[key] ?? "";
      });
      const data = response.data.data.user;
      setStudent({ ...data, avatar });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token, params.id]);

  const fetchFilters = useCallback(async () => {
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
      const course = response.data.data.courses;
      const parallel = response.data.data.parallels;
      const specialty = response.data.data.specialties;
      const academicYear = response.data.data.periods;
      setFilters({ course, parallel, specialty, academicYear });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
  }, [setModal, token]);

  useEffect(() => {
    fetchStudent();
    fetchFilters();
  }, [fetchStudent, fetchFilters]);

  const deactivate = async (state) => {
    setIsLoading(true);
    try {
      await axios.get(
        `${process.env.REACT_APP_BACK_URL}/student/${params.id}/destroy`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      setStudent((prevState) => {
        return { ...prevState, state };
      });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  const saveData = async (event) => {
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
        `${process.env.REACT_APP_BACK_URL}/student/${params.id}/update`,
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
          representative_personal_phone: student.representative_personal_phone,
          course_id: student.course,
          parallel_id: student.parallel,
          specialty_id: student.specialty,
          academic_period_id: student.academic_period,
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
            `${process.env.REACT_APP_BACK_URL}/${params.id}/save`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
              },
            }
          );
        } catch (error) {
          setModal({ title: "ERROR", message: error.response.data.message });
        }
      }
      setModal({ title: "CORRECTO", message: response.data.message });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={saveData}>
      <MainContainer
        title="Editar estudiante"
        buttonTitle="Guardar"
        type="submit"
        backButton
        // addSubjectButton
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
            value={student.representative_personal_phone}
            maxLength="10"
            onChange={(event) => {
              setStudent({
                ...student,
                representative_personal_phone: event.target.value,
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
            disabled={user.role !== "secretary"}
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
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Especialidad"
            type="select"
            options={filters.specialty}
            theme="simple"
            value={student.specialty}
            onChange={(event) => {
              setStudent({ ...student, specialty: event.target.value });
            }}
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="ESTADO">
          <Card>
            <OnOffInput
              value={student.state}
              onChange={(state) => {
                deactivate(state);
              }}
            />
          </Card>
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default EditStudent;
