import React, { useCallback, useContext, useEffect, useState } from "react";
import MainContainer from "../../components/containers/MainContainer";
import SubContainer from "../../components/containers/SubContainer";
import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import classes from "./Home.module.css";

function Home() {
  const { setIsLoading, setModal } = useContext(AlertContext);
  const { user, token } = useContext(AuthContext);

  const [logo, setLogo] = useState({
    logo: "",
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      const data = {
        logo: "http://www.quitoinforma.gob.ec/wp-content/uploads/2019/05/logoquito-1-800x445.png",
      };
      setLogo(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
    }
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer title="Bienvenido" style={{bottom: "auto"}}>
      <SubContainer>
        <div className={classes.title}>
          Bienvenido al sistema de gestión de notas del Instituto Educativo
          Fiscal Miguel de Santiago
        </div>
        <div className={classes.imageBox}>
          <div className={classes.image}>
            <img src={logo.logo} alt="Logo institucional" />
          </div>
        </div>
      </SubContainer>
    </MainContainer>
  );
}

export default Home;
