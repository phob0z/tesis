import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/container/LongMainContainer";
import LongSubContainer from "../../components/container/LongSubContainer";
import OnOffCard from "../../components/cards/OnOffCard";

function Subjects() {
  const navigate = useNavigate();
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [subjects, setSubjects] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Subjects/`,
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
          name: "Matemáticas",
          state: true,
        },
        {
          id: "2",
          name: "Deporte",
          state: false,
        },
        {
          id: "3",
          name: "Lenguaje",
          state: true,
        },
      ];
      setSubjects([...data]);
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
      title="Asignaturas"
      buttonTitle="Nueva"
      onClick={() => {
        navigate("newSubject");
      }}
    >
      {subjects.length === 0 ? (
        <LongSubContainer>No se encontraron asignaturas.</LongSubContainer>
      ) : (
        subjects.map((course) => {
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

export default Subjects;
