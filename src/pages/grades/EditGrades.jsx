import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const [grades, setGrades] = useState({});
  const today = useMemo(() => {
    return new Date();
  }, []);
  const [blockGrades, setBlockGrades] = useState({});
  const [dates, setDates] = useState({});
  const [error, setError] = useState(false);
  const [promTotal, setPromTotal] = useState(0);

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
      if (user.role === "teacher")
        setDates({
          finq1: response.data.data.finq1 ?? null,
          finq2: response.data.data.finq2 ?? null,
        });
      const data = response.data.data.grades;
      var total = 0;
      for (let grade of data) {
        total += grade.final;
      }
      setPromTotal(total / data.length);

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

  useEffect(() => {
    if (dates.finq1) {
      setBlockGrades((prevState) => {
        return {
          ...prevState,
          blockq1:
            today.getTime() >
            new Date(dates.finq1.replace(/-/g, "/")).getTime(),
        };
      });
    }
    if (dates.finq2) {
      setBlockGrades((prevState) => {
        return {
          ...prevState,
          blockq2:
            today.getTime() >
            new Date(dates.finq2.replace(/-/g, "/")).getTime(),
        };
      });
    }
  }, [dates, today]);

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
      title="Calificaciones"
      onSave={user.role !== "student" ? onSave : false}
      backButton={user.role === "secretary" ? "./../../" : true}
    >
      {!subjects || subjects.length === 0 ? (
        <LongSubContainer>
          <div className="text">
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
                  blockq1={blockGrades.blockq1}
                  blockq2={blockGrades.blockq2}
                  p1q1={
                    subject.p1q1
                      ? (Math.round(subject.p1q1 * 100) / 100).toFixed(2)
                      : ""
                  }
                  p2q1={
                    subject.p2q1
                      ? (Math.round(subject.p2q1 * 100) / 100).toFixed(2)
                      : ""
                  }
                  p3q1={
                    subject.p3q1
                      ? (Math.round(subject.p3q1 * 100) / 100).toFixed(2)
                      : ""
                  }
                  p1q2={
                    subject.p1q2
                      ? (Math.round(subject.p1q2 * 100) / 100).toFixed(2)
                      : ""
                  }
                  p2q2={
                    subject.p2q2
                      ? (Math.round(subject.p2q2 * 100) / 100).toFixed(2)
                      : ""
                  }
                  p3q2={
                    subject.p3q2
                      ? (Math.round(subject.p3q2 * 100) / 100).toFixed(2)
                      : ""
                  }
                  supletorio={
                    subject.supletorio
                      ? (Math.round(subject.supletorio * 100) / 100).toFixed(2)
                      : ""
                  }
                  remedial={
                    subject.remedial
                      ? (Math.round(subject.remedial * 100) / 100).toFixed(2)
                      : ""
                  }
                  gracia={
                    subject.gracia
                      ? (Math.round(subject.gracia * 100) / 100).toFixed(2)
                      : ""
                  }
                  final={
                    subject.final
                      ? (Math.round(subject.final * 100) / 100).toFixed(2)
                      : ""
                  }
                  role={user.role}
                  onGradesChange={(grades) => {
                    setGrades(grades);
                  }}
                  setError={(error) => {
                    setError(error);
                  }}
                />
              </LongSubContainer>
            );
          })}
          {user.role !== "teacher" && (
            <LongSubContainer>
              <GradesFooter
                behaviour1={student.comportamiento1 ?? ""}
                behaviour2={student.comportamiento2 ?? ""}
                promedioFinal={
                  promTotal
                    ? (Math.round(promTotal * 100) / 100).toFixed(2)
                    : ""
                }
                onBehaviourChange={onBehaviourChange}
                setError={(error) => {
                  setError(error);
                }}
                role={user.role}
              />
            </LongSubContainer>
          )}
        </Fragment>
      )}
    </LongMainContainer>
  );
}

export default EditGrades;
