import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import GradesCard from "../../components/cards/GradesCard";
import GradesHeader from "../../components/cards/GradesHeader";
import GradesFooter from "../../components/cards/GradesFooter";

function EditGrades() {
  const navigate = useNavigate();
  const params = useParams();
  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [promedioFinal, setPromedioFinal] = useState(0);
  const [finals, setFinals] = useState({});

  const fetchData = async () => {
    setIsLoading(true);
    var url;
    try {
      switch (user.role) {
        case "secretary":
          url = `${process.env.REACT_APP_BACK_URL}/secretary/${params.studentId}/${params.academicYearId}/grades`;
          //http://localhost:3000/grades/secretary/19/1
          break;
        case "teacher":
          url = `${process.env.REACT_APP_BACK_URL}/teacher/${params.studentId}/${params.subjectId}/grades`;
          //http://localhost:3000/grades/teacher/15/19
          break;
        case "student":
          url = `${process.env.REACT_APP_BACK_URL}/student/${params.academicYearId}/grades`;
          break;
        default:
          url = `${process.env.REACT_APP_BACK_URL}/student/${params.academicYearId}/grades`;
          break;
      }
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      });
      const data = response.data.data.grades;
      const student = response.data.data.user;
      setStudent(student);
      if (data.length === undefined) setSubjects([data]);
      else setSubjects(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  const onBehaviourChange = (behaviours) => {
    setStudent((prevState) => {
      return {
        ...prevState,
        comportamiento1: behaviours.behaviour1,
        comportamiento2: behaviours.behaviour2,
      };
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onFinalChange = (id, grade) => {
    setFinals((prevState) => {
      return { ...prevState, [id]: grade };
    });
  };

  useEffect(() => {
    var sum = 0;
    for (const grade of Object.values(finals)) {
      if (grade) sum += Number.isNaN(parseFloat(grade)) ? 0 : parseFloat(grade);
    }
    const result = (sum / Object.keys(finals).length).toFixed(2);
    setPromedioFinal(result);
  }, [finals]);

  return (
    <LongMainContainer
      big
      title="Notas"
      buttonTitle="Volver"
      onClick={() => {
        navigate("../");
      }}
      buttonSave
    >
      {!subjects || subjects.length === 0 ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            El estudiante no tiene asignaturas inscritas.
          </div>
        </LongSubContainer>
      ) : (
        <Fragment>
          <LongSubContainer>
            <GradesHeader
              student_name={student.student_name ?? ""}
              student_last_name={student.student_last_name ?? ""}
              course={student.course_name ?? ""}
              parallel={student.parallel_name ?? ""}
              specialty={student.specialty_name ?? ""}
              academic_period={student.academic_period_name ?? ""}
            />
          </LongSubContainer>
          {subjects.map((subject) => {
            return (
              <LongSubContainer key={subject.subject_id}>
                <GradesCard
                  id={subject.subject_id ?? ""}
                  name={subject.subject_name ?? ""}
                  // q1blocked={subject.q1blocked}
                  // q2blocked={subject.q2blocked}
                  q1p1={subject.q1p1 ?? ""}
                  q1p2={subject.q1p2 ?? ""}
                  q1p3={subject.q1p3 ?? ""}
                  q2p1={subject.q2p1 ?? ""}
                  q2p2={subject.q2p2 ?? ""}
                  q2p3={subject.q2p3 ?? ""}
                  supletory={subject.supletory ?? ""}
                  remedial={subject.remedial ?? ""}
                  grace={subject.grace ?? ""}
                  final={subject.final ?? ""}
                  onFinalChange={onFinalChange}
                  role={user.role}
                />
              </LongSubContainer>
            );
          })}
          <LongSubContainer>
            <GradesFooter
              behaviour1={student.comportamiento1 ?? ""}
              behaviour2={student.comportamiento2 ?? ""}
              promedioFinal={promedioFinal}
              onBehaviourChange={onBehaviourChange}
              role={user.role}
            />
          </LongSubContainer>
        </Fragment>
      )}
    </LongMainContainer>
  );
}

export default EditGrades;
