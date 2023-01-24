import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";

import classes from "./Home.module.css";

function Home() {
  const { setIsLoading, setModal } = useContext(AlertContext);
  const { token } = useContext(AuthContext);

  const [information, setInformation] = useState({
    name: "",
    logo: "",
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/information`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.info;
      const logo = response.data.data.avatar;
      setInformation({ ...data, logo });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer title="Bienvenido" style={{ bottom: "auto" }}>
      <SubContainer>
        <div className={classes.title}>{information.name}</div>
        <div className={classes.imageBox}>
          <div className={classes.image}>
            <img src={information.logo} alt="Logo institucional" />
          </div>
        </div>
      </SubContainer>
    </MainContainer>
  );
}

export default Home;
