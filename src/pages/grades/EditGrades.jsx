import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [promedioFinal, setPromedioFinal] = useState(0);
  const [finals, setFinals] = useState({});

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // const response = await axios.get(
      //   `${process.env.REACT_APP_BACK_URL}/secretary/${params.id}/${params.academicYear}/grades`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //       Authorization: token,
      //     },
      //   }
      // );
      // const data = response.data.data.grades;
      // console.log(data);
      const user = {
        student_name: "Karlee Dylan",
        student_last_name: "Corwin Nikolaus",
        course_name: "Octavo de básica",
        parallel_name: "A",
        specialty_name: "BGU",
        academic_period_name: "2023",
        comportamiento1: "B",
        comportamiento2: "B",
        total: 6.75,
      };

      setUser(user);

      const data = [
        {
          subject_id: "1",
          subject_name: "Matemáticas",
          // q1blocked: "1",
          // q2blocked: "0",
          q1p1: "8",
          q1p2: "7",
          q1p3: "5",
          q2p1: "6",
          q2p2: "7",
          q2p3: "4",
          supletory: "",
          remedial: "",
          grace: "",
          final: "10",
        },
        {
          subject_id: "2",
          subject_name: "Lenguaje y comunicación",
          // q1blocked: "1",
          // q2blocked: "0",
          q1p1: "10",
          q1p2: "10",
          q1p3: "10",
          q2p1: "10",
          q2p2: "10",
          q2p3: "10",
          supletory: "",
          remedial: "",
          grace: "",
          final: "10",
        },
        {
          subject_id: "3",
          subject_name: "Geometría",
          // q1blocked: "1",
          // q2blocked: "0",
          q1p1: "1",
          q1p2: "4",
          q1p3: "8",
          q2p1: "2",
          q2p2: "3",
          q2p3: "5",
          supletory: "",
          remedial: "",
          grace: "",
          final: "10",
        },
      ];
      setSubjects(data);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  const onBehaviourChange = (behaviours) => {
    setUser((prevState) => {
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
              student_name={user.student_name}
              student_last_name={user.student_last_name}
              course={user.course_name}
              parallel={user.parallel_name}
              specialty={user.specialty_name}
              academic_period={user.academic_period_name}
            />
          </LongSubContainer>
          {subjects.map((subject) => {
            return (
              <LongSubContainer key={subject.subject_id}>
                <GradesCard
                  id={subject.subject_id}
                  name={subject.subject_name}
                  // q1blocked={subject.q1blocked}
                  // q2blocked={subject.q2blocked}
                  q1p1={subject.q1p1}
                  q1p2={subject.q1p2}
                  q1p3={subject.q1p3}
                  q2p1={subject.q2p1}
                  q2p2={subject.q2p2}
                  q2p3={subject.q2p3}
                  supletory={subject.supletory}
                  remedial={subject.remedial}
                  grace={subject.grace}
                  final={subject.final}
                  onFinalChange={onFinalChange}
                />
              </LongSubContainer>
            );
          })}
          <LongSubContainer>
            <GradesFooter
              behaviour1={user.comportamiento1}
              behaviour2={user.comportamiento2}
              promedioFinal={promedioFinal}
              onBehaviourChange={onBehaviourChange}
            />
          </LongSubContainer>
        </Fragment>
      )}
    </LongMainContainer>
  );
}

export default EditGrades;
