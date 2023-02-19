import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";

import LongMainContainer from "../../components/containers/LongMainContainer";
import LongSubContainer from "../../components/containers/LongSubContainer";
import { useNavigate } from "react-router-dom";

function SecretarySelect() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [filters, setFilters] = useState([]);

  const [search, setSearch] = useState({
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

  useEffect(() => {
    fetchFilters();
    // eslint-disable-next-line
  }, []);

  const onSearch = () => {
    if (
      search.course === "" ||
      search.parallel === "" ||
      search.specialty === "" ||
      search.academicYear === ""
    ) {
      setModal({
        title: "ERROR",
        message: "Debe seleccionar todos los filtros para generar el reporte",
      });
      return;
    }
    navigate(
      `./${search.course}/${search.parallel}/${search.specialty}/${search.academicYear}`
    );
  };

  return (
    <LongMainContainer
      title="Reportes"
      onSearch={onSearch}
      searchButtonTitle="Generar"
      hideSearchInput={true}
      search={search}
      filters={filters}
      onChange={(value) => {
        setSearch((prevState) => {
          return { ...prevState, ...value };
        });
      }}
      buttonBack
      className="short"
    >
      <LongSubContainer>
        <div
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            minWidth: "100%",
          }}
        >
          Debe seleccionar todos los filtros y posteriormente hacer clic en el
          botón "Generar"
        </div>
      </LongSubContainer>
    </LongMainContainer>
  );
}

export default SecretarySelect;
