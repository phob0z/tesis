import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import SubjectCard from "../../components/cards/SubjectCard";

function TeacherSubjects() {
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
    <LongMainContainer title="Asignaturas">
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
                buttonTitle="Estudiantes"
                id={subject.id}
                name={subject.name}
                // teacher_id={teacher_id}
                teacher_name={subject.teacher_name}
                teacher_last_name={subject.teacher_last_name}
                course={subject.course}
                // course_id={subject.course_id}
                parallel={subject.parallel}
                // parallel_id={subject.parallel_id}
                specialty={subject.specialty}
                // specialty_id={subject.specialty_id}
                academicYear={subject.academic_period}
                // academicYear_id={subject.academic_period_id}
                // state={subject.state}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default TeacherSubjects;
