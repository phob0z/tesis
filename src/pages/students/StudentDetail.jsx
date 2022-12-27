import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/atoms/Card";

function StudentDetail() {
  const params = useParams();

  const { user, token} = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [userProfile, setUserProfile] = useState({ user });

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
      setUserProfile({ ...user, avatar: avatar, identification: params.identification });
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

  return (
    <MainContainer title="Estudiante" buttonTitle="Guardar" type="submit">
      <SubContainer subTitle="INFO PERSONAL">
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
          validation="identification"
          disabled={user.role !== "secretary"}
        />
      </SubContainer>
    </MainContainer>
  );
}

export default StudentDetail;
