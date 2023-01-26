import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import SubjectCard from "../../components/cards/SubjectCard";

function TeacherSubjects(props) {
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [subjects, setSubjects] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/teacher/mySubjects`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.subjects;
      setSubjects(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <LongMainContainer title="Asignaturas" buttonBack>
      {!subjects || subjects.length === 0 ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            No se encontraron asignaturas asociadas.
          </div>
        </LongSubContainer>
      ) : (
        subjects.map((subject) => {
          return (
            <LongSubContainer key={subject.id}>
              <SubjectCard
                buttonTitle={props.buttonTitle ?? "Estudiantes"}
                id={subject.id ?? ""}
                name={subject.name ?? ""}
                course={subject.course ?? ""}
                parallel={subject.parallel ?? ""}
                specialty={subject.specialty ?? ""}
                academicYear={subject.academic_period ?? ""}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default TeacherSubjects;
