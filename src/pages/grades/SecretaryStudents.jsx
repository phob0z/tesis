import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import StudentCard from "../../components/cards/StudentCard";
import { useNavigate } from "react-router-dom";

function SecretaryStudents() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [students, setStudents] = useState(null);
  const [filters, setFilters] = useState([]);

  const [search, setSearch] = useState({
    identification: "",
    course: "",
    parallel: "",
    specialty: "",
    academicYear: "",
  });

  const fetchFilters = async () => {
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
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/student/search`,
        {
          identification: search.identification,
          course_id: search.course,
          parallel_id: search.parallel,
          specialty_id: search.specialty,
          academic_period_id: search.academicYear,
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
      setStudents([...data]);
    } catch (error) {
      setModal({ title: "ERROR", message: error.response.data.message });
    }
    setIsLoading(false);
  };

  const onClick = (studentId) => {
    navigate(`./${studentId}/${filters.academicYears[0].id}`);
  };

  useEffect(() => {
    fetchFilters();
    // eslint-disable-next-line
  }, []);

  const onSearch = () => {
    if (
      search.identification === "" &&
      search.course === "" &&
      search.parallel === "" &&
      search.specialty === "" &&
      search.academicYear === ""
    ) {
      setModal({
        title: "ERROR",
        message:
          "Debe seleccionar al menos un filtro o introducir una identificación a buscar",
      });
      return;
    }
    if (search.identification !== "") {
      setSearch((prevState) => {
        return {
          ...prevState,
          course: "",
          parallel: "",
          specialty: "",
          academicYear: "",
        };
      });
    }
    fetchData();
    setSearch((prevState) => {
      return {
        ...prevState,
        identification: "",
      };
    });
  };

  return (
    <LongMainContainer
      title="Estudiantes"
      onSearch={onSearch}
      search={search}
      filters={filters}
      onChange={(value) => {
        setSearch((prevState) => {
          return { ...prevState, ...value };
        });
      }}
      searchBarLabel="Identificación"
      backButton
    >
      {!students ? (
        <LongSubContainer>
          <div className="text">
            Usar los filtros o una identificación y posteriormente hacer clic
            en el botón "Buscar"
          </div>
        </LongSubContainer>
      ) : students.length === 0 ? (
        <LongSubContainer>
          <div className="text">
            No se encontraron estudiantes con esos parámetros.
          </div>
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

export default SecretaryStudents;
