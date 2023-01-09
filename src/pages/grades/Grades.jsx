import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import StudentCard from "../../components/cards/StudentCard";

function Grades() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [grades, setGrades] = useState(null);
  const [filters, setFilters] = useState([]);

  const [search, setSearch] = useState({
    identification: "",
    courses: "",
    parallels: "",
    specialties: "",
    academicYears: "",
  });

  const fetchFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/filter`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const courses = response.data.data.courses;
      const parallels = response.data.data.parallels;
      const specialties = response.data.data.specialties;
      const academicYears = response.data.data.periods;
      setFilters({ courses, parallels, specialties, academicYears });
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal, token]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/student/search`,
        {
          identification: search.identification,
          course_id: search.courses,
          parallel_id: search.parallels,
          specialty_id: search.specialties,
          academic_period_id: search.academicYears,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = response.data.data.users;
      setGrades([...data]);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const onSearch = () => {
    console.log(search);
    fetchData();
  };

  return (
    <LongMainContainer
      title="Estudiantes"
      // buttonTitle="Nuevo"
      // onClick={() => {
      //   navigate("newStudent");
      // }}
      onSearch={onSearch}
      showSearchInput
      search={search}
      filters={filters}
      onChange={(value) => {
        setSearch((prevState) => {
          return { ...prevState, ...value };
        });
      }}
      searchBarLabel="Identificación"
    >
      {!grades ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            Usar los filtros y/o una identificación y posteriormente hacer clic
            en el botón "Buscar"
          </div>
        </LongSubContainer>
      ) : grades.length === 0 ? (
        <LongSubContainer>
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              minWidth: "100%",
            }}
          >
            No se encontraron estudiantes con esos parámetros.
          </div>
        </LongSubContainer>
      ) : (
        grades.map((student) => {
          return (
            <LongSubContainer key={student.identification}>
              <StudentCard
                id={student.id}
                name={student.name}
                last_name={student.last_name}
                identification={student.identification}
                course={student.course}
                parallel={student.parallel}
                specialty={student.specialty}
                state={student.state}
                buttonTitle="Notas"
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Grades;
