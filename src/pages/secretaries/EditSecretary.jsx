import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import Card from "../../components/cards/Card";
import OnOffInput from "../../components/atoms/OnOffInput";
import { useParams } from "react-router-dom";

function EditSecretary() {
  const params = useParams();
  const [secretary, setSecretary] = useState({
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

  const fetchSecretary = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/secretary/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const avatar = response.data.data.avatar;
      const data = response.data.data.user;
      setSecretary({ ...data, avatar });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token, params.id]);

  useEffect(() => {
    fetchSecretary();
  }, [fetchSecretary]);

  const deactivate = async (state) => {
    setIsLoading(true);
    try {
      await axios.get(
        `${process.env.REACT_APP_BACK_URL}/secretary/${params.id}/destroy`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      setSecretary((prevState) => {
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
        `${process.env.REACT_APP_BACK_URL}/secretary/${params.id}/update`,
        {
          name: secretary.name,
          last_name: secretary.last_name,
          identification: secretary.identification,
          birthdate: secretary.birthdate,
          email: secretary.email,
          home_phone: secretary.home_phone,
          personal_phone: secretary.personal_phone,
          address: secretary.address,
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
        title="Editar secretaria"
        buttonTitle="Guardar"
        type="submit"
        backButton
        // addSubjectButton
      >
        <SubContainer subTitle="INFO PERSONAL">
          <Card
            label="Nombres"
            value={secretary.name??""}
            maxLength="35"
            onChange={(event) => {
              setSecretary({ ...secretary, name: event.target.value });
            }}
            setError={setErrorName}
            validation="text"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Apellidos"
            value={secretary.last_name??""}
            maxLength="35"
            onChange={(event) => {
              setSecretary({ ...secretary, last_name: event.target.value });
            }}
            setError={setErrorLastName}
            validation="text"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Identificación"
            value={secretary.identification??""}
            maxLength="15"
            onChange={(event) => {
              setSecretary({
                ...secretary,
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
            value={secretary.birthdate??""}
            maxLength="10"
            type="date"
            onChange={(date) => {
              setSecretary({ ...secretary, birthdate: date });
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
            value={secretary.email??""}
            maxLength="50"
            onChange={(event) => {
              setSecretary({ ...secretary, email: event.target.value });
            }}
            setError={setErrorEmail}
            validation="email"
            must
            disabled={user.role !== "secretary"}
          />
          <Card
            label="Teléfono fijo"
            value={secretary.home_phone??""}
            maxLength="9"
            onChange={(event) => {
              setSecretary({
                ...secretary,
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
            value={secretary.personal_phone??""}
            maxLength="10"
            onChange={(event) => {
              setSecretary({
                ...secretary,
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
            value={secretary.address??""}
            maxLength="150"
            onChange={(event) => {
              setSecretary({ ...secretary, address: event.target.value });
            }}
            setError={setErrorAddress}
            validation="address"
            must
            disabled={user.role !== "secretary"}
          />
        </SubContainer>
        <SubContainer subTitle="IMAGEN DE PERFIL">
          <Card
            value={secretary.avatar}
            type="image"
            onChange={(image) => {
              setAvatarChanged(true);
              setSecretary({ ...secretary, avatar: image.base64 });
              setAvatarFile(image.file);
            }}
            validation="image"
          />
        </SubContainer>
        <SubContainer subTitle="ESTADO">
          <Card>
            <OnOffInput
              value={secretary.state}
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

export default EditSecretary;
