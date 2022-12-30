import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import OnOffCard from "../../components/cards/OnOffCard";

function Specialties() {
  const navigate = useNavigate();
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [specialty, setSpecialties] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Specialties/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      const data = [
        {
          id: "1",
          name: "Electrónica",
          state: true,
        },
        {
          id: "2",
          name: "Informática",
          state: true,
        },
        {
          id: "3",
          name: "Madera",
          state: true,
        },
        {
          id: "4",
          name: "Eletricidad",
          state: false,
        },
      ];
      setSpecialties([...data]);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <LongMainContainer
      title="Especialidades"
      buttonTitle="Nueva"
      onClick={() => {
        navigate("newSpecialty");
      }}
    >
      {specialty.length === 0 ? (
        <LongSubContainer>No se encontraron especialidades.</LongSubContainer>
      ) : (
        specialty.map((course) => {
          return (
            <LongSubContainer key={course.id}>
              <OnOffCard
                id={course.id}
                name={course.name}
                state={course.state}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Specialties;
