import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../../contexts/alert/AlertContext";

import LongMainContainer from "../../components/container/LongMainContainer";
import LongSubContainer from "../../components/container/LongSubContainer";
import OnOffCard from "../../components/cards/OnOffCard";

function Courses() {
  const navigate = useNavigate();
  const { setIsLoading, setModal } = useContext(AlertContext);

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
      const data1 = await response.json();
      const data = [
        {
          id: "1",
          name: "8vo",
          state: true,
        },
        {
          id: "2",
          name: "9no",
          state: true,
        },
        {
          id: "3",
          name: "10mo",
          state: true,
        },
        {
          id: "4",
          name: "1ero",
          state: false,
        },
        {
          id: "5",
          name: "3ero",
          state: true,
        },
      ];
      setCourses([...data]);
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
                state={course.state}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Courses;
