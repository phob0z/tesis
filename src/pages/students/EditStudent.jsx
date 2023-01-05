import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";
import OnOffInput from "../../components/atoms/OnOffInput";
import { useParams } from "react-router-dom";

function EditStudent() {
  const params = useParams();
  const [student, setStudent] = useState({
    name: "",
    last_name: "",
    identification: "",
    birthdate: "",
    email: "",
    home_phone: "",
    personal_phone: "",
    address: "",
    state: false,
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
  const [errorRepreName, setErrorRepreName] = useState(false);
  const [errorRepreLastName, setErrorRepreLastName] = useState(false);
  const [errorRepreIdentification, setErrorRepreIdentification] =
    useState(false);
  const [errorReprePersonalPhone, setErrorReprePersonalPhone] = useState(false);
  // const [errorCourse, setErrorCourse] = useState(false);
  // const [errorParallel, setErrorParallel] = useState(false);
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
      : // : errorCourse.error
        // ? setError(errorCourse)
        // : errorParallel.error
        // ? setError(errorParallel)
        setError(false);
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
    // errorCourse,
    // errorParallel
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
      const data = response.data.data.user;
      setStudent(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token, params.id]);

  const fetchFilters = useCallback(async () => {
    try {
      // const response = await axios.get(
      //   `${process.env.REACT_APP_BACK_URL}/filters`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //       Authorization: token,
      //     },
      //   }
      // );
      const data = {
        course: ["1ero", "8vo", "9no", "10mo"],
        parallel: ["A", "B", "C", "D"],
      };
      setFilters(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error });
    }
  }, [setModal, token]);

  useEffect(() => {
    fetchStudent();
    fetchFilters();
  }, [fetchStudent, fetchFilters]);

  const deactivate = async () => {
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
    } catch (error) {
      setModal({ title: "ERROR", message: error });
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
          representative_phone: student.representative_phone,
          course: student.course,
          parallel: student.parallel,
          // role: "student",
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
        addSubjectButton
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
            onChange={(date) => {
              setStudent({ ...student, birthdate: date });
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
            validation="nonEmpty"
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
            // setError={setErrorCourse}
            // validation="select"
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
            // setError={setErrorParallel}
            // validation="select"
          />
        </SubContainer>
        <SubContainer subTitle="ESTADO">
          <Card>
            <OnOffInput
              value={student.state}
              onChange={(state) => {
                deactivate();
                setStudent({ ...student, state });
              }}
            />
          </Card>
        </SubContainer>
      </MainContainer>
    </form>
  );
}

export default EditStudent;
