import React, { useCallback, useContext, useEffect, useState } from "react";
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
  const [searchBar, setSearchBar] = useState("");
  const [search, setSearch] = useState({
    identification: "",
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/subject`,
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
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    onChange();
    // eslint-disable-next-line
  }, [search]);

  const onSearch = () => {
    setSearch((prevState) => {
      return { ...prevState, identification: searchBar };
    });
  };

  const onChange = () => {
    console.log(search);
    console.log("Haciendo el pedido al back con los nuevos parametros");
    fetchData();
  };

  return (
    <LongMainContainer
      title="Asignaturas"
      buttonTitle="Nueva"
      onSearch={onSearch}
      showSearchInput
      onClick={() => {
        navigate("newSubject");
      }}
      searchBar={searchBar}
      searchBarLabel="Asignatura"
      onIdentificationChange={(event) => {
        setSearchBar(event.target.value);
      }}
    >
      {!subjects ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            Escribir una identificación y posteriormente hacer clic en el botón
            "Buscar"
          </div>
        </LongSubContainer>
      ) : subjects?.length === 0 ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            No se encontraron asignaturas.
          </div>
        </LongSubContainer>
      ) : (
        subjects.map((subject) => {
          return (
            <LongSubContainer key={subject.id}>
              <SubjectCard
                id={subject.id}
                name={subject.name}
                teacher={subject.teacher}
                course={subject.course}
                parallel={subject.parallel}
                specialty={subject.specialty}
                academicYear={subject.academic_period}
                state={subject.state}
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Subjects;
