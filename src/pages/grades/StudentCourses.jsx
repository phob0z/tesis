import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import StudentCoursesCard from "../../components/cards/StudentCoursesCard";

function StudentCourses(props) {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [courses, setCourses] = useState();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/student/myCourses`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.classrooms;
      setCourses(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onClick = (academicYearId) => {
    navigate(`./${academicYearId}`);
  };

  return (
    <LongMainContainer title="Cursos" buttonBack>
      {!courses || courses.length === 0 ? (
        <LongSubContainer>
          <div className="text">
            No se encontraron cursos para este estudiante.
          </div>
        </LongSubContainer>
      ) : (
        courses.map((course) => {
          return (
            <LongSubContainer key={course.academic_period_id}>
              <StudentCoursesCard
                buttonTitle={props.buttonTitle ?? null}
                course={course.course_name ?? ""}
                parallel={course.parallel_name ?? ""}
                specialty={course.specialty_name ?? ""}
                academic_period={course.academic_period_name ?? ""}
                academic_period_id={course.academic_period_id ?? ""}
                onClick={onClick}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default StudentCourses;
