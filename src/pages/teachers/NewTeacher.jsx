import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/cards/Card";

function NewTeacher() {
  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [teacher, setTeacher] = useState({ user });

  const fetchFullTeacher = useCallback(async () => {
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
      const data = response.data.data;
      setTeacher({ ...data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
    }
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchFullTeacher();
  }, [fetchFullTeacher]);

  return (
    <MainContainer title="Nuevo profesor" buttonTitle="Guardar" type="submit">
      <SubContainer subTitle="INFO PERSONAL">
        <Card
          label="Identificación"
          value={teacher.identification}
          maxLength="20"
          onChange={(event) => {
            setTeacher({
              ...teacher,
              identification: event.target.value,
            });
          }}
          validation="identification"
          disabled={user.role !== "secretary"}
        />
      </SubContainer>
    </MainContainer>
  );
}

export default NewTeacher;
