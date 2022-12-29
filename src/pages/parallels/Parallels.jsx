import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/container/LongMainContainer";
import LongSubContainer from "../../components/container/LongSubContainer";
import OnOffCard from "../../components/Cards/OnOffCard";

function Parallels() {
  const navigate = useNavigate();
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [parallels, setParallels] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Parallels/`,
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
          name: "A",
          active: true,
        },
        {
          id: "2",
          name: "B",
          active: true,
        },
        {
          id: "3",
          name: "C",
          active: true,
        },
        {
          id: "4",
          name: "A1",
          active: false,
        },
        {
          id: "5",
          name: "D4",
          active: true,
        },
      ];
      setParallels([...data]);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
      setHasError(true);
    }
    setIsLoading(false);
  }, [setHasError, setIsLoading, setModal]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <LongMainContainer
      title="Paralelos"
      buttonTitle="Nuevo"
      onClick={() => {
        navigate("newParallel");
      }}
    >
      {parallels.length === 0 ? (
        <LongSubContainer>No se encontraron paralelos.</LongSubContainer>
      ) : (
        parallels.map((course) => {
          return (
            <LongSubContainer key={course.id}>
              <OnOffCard
                id={course.id}
                name={course.name}
                active={course.active}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Parallels;
