import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import SubjectCard from "../../components/cards/SubjectCard";

function Subjects() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [subjects, setSubjects] = useState(null);

  const [search, setSearch] = useState({
    identification: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/subject/search`,
        {
          name: search.identification,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.subjects;
      setSubjects([...data]);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
    // eslint-disable-next-line
  };

  const onSearch = () => {
    if (search.identification === "") {
      setModal({
        title: "ERROR",
        message: "Debe introducir una identificación a buscar",
      });
      return;
    }
    fetchData();
    setSearch({ identification: "" });
  };

  return (
    <LongMainContainer
      title="Asignaturas"
      buttonTitle="Nueva"
      onClick={() => {
        navigate("newSubject");
      }}
      onSearch={onSearch}
      showSearchInput
      search={search}
      onChange={(value) => {
        setSearch((prevState) => {
          return { ...prevState, ...value };
        });
      }}
      searchBarLabel="Asignatura"
    >
      {!subjects ? (
        <LongSubContainer>
          <div className="text">
            Escribir el nombre de una asignatura y posteriormente hacer clic en
            el botón "Buscar"
          </div>
        </LongSubContainer>
      ) : subjects?.length === 0 ? (
        <LongSubContainer>
          <div className="text">
            No se encontraron asignaturas con esos parámetros.
          </div>
        </LongSubContainer>
      ) : (
        subjects.map((subject) => {
          return (
            <LongSubContainer key={subject.id}>
              <SubjectCard
                id={subject.id}
                name={subject.name}
                teacher_name={subject.teacher_name}
                teacher_last_name={subject.teacher_last_name}
                course={subject.course}
                parallel={subject.parallel}
                specialty={subject.specialty}
                academicYear={subject.academic_period}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Subjects;
