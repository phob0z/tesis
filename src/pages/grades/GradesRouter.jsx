import React, { Fragment, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import EditGrades from "./EditGrades";
import SecretaryStudents from "./SecretaryStudents";
import StudentCourses from "./StudentCourses";
import TeacherStudents from "./TeacherStudents";
import TeacherSubjects from "./TeacherSubjects";

function GradesRouter() {
  const { user } = useContext(AuthContext);

  const route = () => {
    switch (user.role) {
      case "secretary":
        return (
          <Fragment>
            <Route path="" element={<SecretaryStudents />} />
            <Route path=":studentId/:academicYearId" element={<EditGrades />} />
          </Fragment>
        );
      case "teacher":
        return (
          <Fragment>
            <Route path="" element={<TeacherSubjects />} />
            <Route path=":subjectId" element={<TeacherStudents />} />
            <Route path=":subjectId/:studentId" element={<EditGrades />} />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Route path="" element={<StudentCourses buttonTitle="Notas" />} />
            <Route path=":academicYearId" element={<EditGrades />} />
          </Fragment>
        );
    }
  };

  return <Routes>{route()}</Routes>;
}

export default GradesRouter;
