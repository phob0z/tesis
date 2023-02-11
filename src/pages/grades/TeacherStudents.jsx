import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import StudentCard from "../../components/cards/StudentCard";
import { useNavigate, useParams } from "react-router-dom";

function TeacherStudents() {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [students, setStudents] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/teacher/${params.subjectId}/studentsList`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.students;
      setStudents(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  const onClick = (studentId) => {
    navigate(`./${studentId}`);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <LongMainContainer title="Estudiantes" buttonBack>
      {!students || students.length === 0 ? (
        <LongSubContainer>
          <div className="text">No se encontraron estudiantes asignados.</div>
        </LongSubContainer>
      ) : (
        students.map((student) => {
          return (
            <LongSubContainer key={student.identification}>
              <StudentCard
                id={student.id ?? ""}
                name={student.name ?? ""}
                last_name={student.last_name ?? ""}
                identification={student.identification ?? ""}
                course={student.course ?? ""}
                parallel={student.parallel ?? ""}
                specialty={student.specialty ?? ""}
                academic_period={student.academic_period ?? ""}
                academic_period_id={student.academic_period_id ?? ""}
                state={student.state ?? ""}
                buttonTitle="Calificaciones"
                onClick={onClick}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default TeacherStudents;
