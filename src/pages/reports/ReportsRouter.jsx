import React, { Fragment, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import StudentCourses from "../grades/StudentCourses";
import TeacherSubjects from "../grades/TeacherSubjects";
import Reports from "./Reports";
import SecretarySelect from "./SecretarySelect";

function ReportsRouter() {
  const { user } = useContext(AuthContext);

  const route = () => {
    switch (user.role) {
      case "secretary":
        return (
          <Fragment>
            <Route path="" element={<SecretarySelect />} />
            <Route path=":courseId/:parallelId/:specialtyId/:academicYearId" element={<Reports />} />
          </Fragment>
        );
      case "teacher":
        return (
          <Fragment>
            <Route path="" element={<TeacherSubjects buttonTitle="Reporte"/>} />
            <Route path=":subjectId" element={<Reports />} />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Route path="" element={<StudentCourses buttonTitle="Reporte" />} />
            <Route path=":academicYearId" element={<Reports />} />
          </Fragment>
        );
    }
  };

  return <Routes>{route()}</Routes>;
}

export default ReportsRouter;
