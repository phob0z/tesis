import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import StudentCard from "../../components/cards/StudentCard";

function Students() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [students, setStudents] = useState(null);
  const [filters, setFilters] = useState([]);

  const [searchBar, setSearchBar] = useState("");
  const [search, setSearch] = useState({
    identification: "",
    course: "",
    parallel: "",
    specialty: "",
    academicYear: "",
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
      console.log(response.data.data);
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
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/student`,
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
  }, [setIsLoading, setModal, token]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const onSearch = () => {
    console.log(search);
    console.log("Haciendo el pedido al back con los nuevos parametros");
    setSearch((prevState) => {
      return { ...prevState, identification: searchBar };
    });
    fetchData();
  };

  return (
    <LongMainContainer
      title="Estudiantes"
      buttonTitle="Nuevo"
      onClick={() => {
        navigate("newStudent");
      }}
      onSearch={onSearch}
      showSearchInput
      search={search}
      filters={filters}
      onChange={(value) => {
        setSearch((prevState) => {
          return { ...prevState, ...value };
        });
      }}
      searchBar={searchBar}
      searchBarLabel="Identificación"
      onIdentificationChange={(event) => {
        setSearchBar(event.target.value);
      }}
    >
      {!students ? (
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
      ) : students.length === 0 ? (
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
        students.map((student) => {
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
              />
            </LongSubContainer>
          );
        })
      )}
    </LongMainContainer>
  );
}

export default Students;
