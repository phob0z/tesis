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

function Grades() {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [subjects, setSubjects] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.get(
      //   `${process.env.REACT_APP_BACK_URL}/grades/${params.id}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //       Authorization: token,
      //     },
      //   }
      // );
      // const data = response.data.data.users;
      const data = [
        {
          identification: "asd",
          name: "Mate",
          id: "1",
          q1blocked: "1",
          q2blocked: "0",
          q1p1: "10",
          q1p2: "10",
          q1p3: "10",
          q2p1: "10",
          q2p2: "10",
          q2p3: "10",
          supletory: "10",
          remedial: "10",
          grace: "10",
          final: "10",
        },
        {
          identification: "123",
          name: "Calc",
          id: "2",
          q1blocked: "1",
          q2blocked: "0",
          q1p1: "10",
          q1p2: "10",
          q1p3: "10",
          q2p1: "10",
          q2p2: "10",
          q2p3: "10",
          supletory: "10",
          remedial: "10",
          grace: "10",
          final: "10",
        },
        {
          identification: "aweqwed",
          name: "ASCASD",
          id: "3",
          q1blocked: "1",
          q2blocked: "0",
          q1p1: "10",
          q1p2: "10",
          q1p3: "10",
          q2p1: "10",
          q2p2: "10",
          q2p3: "10",
          supletory: "10",
          remedial: "10",
          grace: "10",
          final: "10",
        },
      ];
      setSubjects([...data]);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            <GradesCard
              name="Asignatura"
              q1p1="P1"
              q1p2="P2"
              q1p3="P3"
              q2p1="P1"
              q2p2="P2"
              q2p3="P3"
              supletory="Supletorio"
              remedial="Remedial"
              grace="Gracia"
              final="Final"
            />
          </LongSubContainer>
          {subjects.map((subject) => {
            return (
              <LongSubContainer key={subject.identification}>
                <GradesCard
                  id={subject.id}
                  name={subject.name}
                  q1blocked={subject.q1blocked}
                  q2blocked={subject.q2blocked}
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
                />
              </LongSubContainer>
            );
          })}
        </Fragment>
      )}
    </LongMainContainer>
  );
}

export default Grades;
