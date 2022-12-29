import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/container/LongMainContainer";
import LongSubContainer from "../../components/container/LongSubContainer";
import OnOffCard from "../../components/Cards/OnOffCard";

function Courses() {
  const navigate = useNavigate();
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [courses, setCourses] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Courses/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      // eslint-disable-next-line
      const data1 = await response.json();
      const data = [
        {
          id: "1",
          name: "8vo",
          active: true,
        },
        {
          id: "2",
          name: "9no",
          active: true,
        },
        {
          id: "3",
          name: "10mo",
          active: true,
        },
        {
          id: "4",
          name: "1ero",
          active: false,
        },
        {
          id: "5",
          name: "3ero",
          active: true,
        },
      ];
      setCourses([...data]);
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
      title="Cursos"
      buttonTitle="Nuevo"
      onClick={() => {
        navigate("newCourse");
      }}
    >
      {courses.length === 0 ? (
        <LongSubContainer>No se encontraron cursos.</LongSubContainer>
      ) : (
        courses.map((course) => {
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

export default Courses;
