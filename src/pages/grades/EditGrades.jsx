import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import GradesCard from "../../components/cards/GradesCard";
import GradesHeader from "../../components/cards/GradesHeader";
import GradesFooter from "../../components/cards/GradesFooter";

function EditGrades() {
  const params = useParams();
  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [promedioFinal, setPromedioFinal] = useState(0);
  const [finals, setFinals] = useState({});
  const [grades, setGrades] = useState({});

  const [error, setError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    var url;
    try {
      switch (user.role) {
        case "secretary":
          url = `${process.env.REACT_APP_BACK_URL}/secretary/${params.studentId}/${params.academicYearId}/grades`;
          break;
        case "teacher":
          url = `${process.env.REACT_APP_BACK_URL}/teacher/${params.studentId}/${params.subjectId}/grades`;
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

  const onSave = async () => {
    if (error) {
      setModal({
        title: "Error en el campo " + error.label.toUpperCase(),
        message: error.error,
      });
      return;
    }
    setIsLoading(true);

    var url;
    var send;
    try {
      switch (user.role) {
        case "secretary":
          url = `${process.env.REACT_APP_BACK_URL}/secretary/${params.studentId}/finalStudentGrade`;
          send = {
            comportamiento1: student.comportamiento1,
            comportamiento2: student.comportamiento2,
          };
          break;
        case "teacher":
          url = `${process.env.REACT_APP_BACK_URL}/teacher/${params.studentId}/${params.subjectId}/updateGrade`;
          send = {
            ...grades,
          };
          break;
        default:
          url = `${process.env.REACT_APP_BACK_URL}/secretary/${params.studentId}/finalStudentGrade`;
          break;
      }
      const response = await axios.post(
        url,
        {
          ...send,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      setModal({ title: "CORRECTO", message: response.data.message });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  return (
    <LongMainContainer
      big
      title="Notas"
      onSave={user.role !== "student" ? onSave : false}
      buttonBack={user.role === "secretary" ? "./../../" : true}
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
                  subject_id={subject.subject_id ?? ""}
                  name={subject.subject_name ?? ""}
                  p1q1={subject.p1q1 ?? ""}
                  p2q1={subject.p2q1 ?? ""}
                  p3q1={subject.p3q1 ?? ""}
                  p1q2={subject.p1q2 ?? ""}
                  p2q2={subject.p2q2 ?? ""}
                  p3q2={subject.p3q2 ?? ""}
                  supletorio={subject.supletorio ?? ""}
                  remedial={subject.remedial ?? ""}
                  gracia={subject.gracia ?? ""}
                  final={subject.final ?? ""}
                  onFinalChange={onFinalChange}
                  role={user.role}
                  onGradesChange={(grades) => {
                    setGrades(grades);
                    // setSubjects(
                    //   subjects.map((subject) => {
                    //     if (subject.subject_id === grades.subject_id) {
                    //       return grades;
                    //     } else {
                    //       return subject;
                    //     }
                    //   })
                    // );
                  }}
                  setError={(error) => {
                    setError(error);
                  }}
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
              setError={(error) => {
                setError(error);
              }}
              role={user.role}
            />
          </LongSubContainer>
        </Fragment>
      )}
    </LongMainContainer>
  );
}

export default EditGrades;
