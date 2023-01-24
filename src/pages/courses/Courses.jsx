import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import OnOffCard from "../../components/cards/OnOffCard";

function Courses() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [courses, setCourses] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/course`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.courses;
      setCourses([...data]);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token]);

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
      {!courses || courses?.length === 0 ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            No se encontraron cursos.
          </div>
        </LongSubContainer>
      ) : (
        courses.map((course) => {
          return (
            <LongSubContainer key={course.id}>
              <OnOffCard
                id={course.id}
                name={course.name ?? ""}
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
