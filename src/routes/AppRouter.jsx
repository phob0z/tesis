import React, { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import AuthProvider from "../contexts/auth/AuthProvider";

import Login from "../pages/auth/Login";
import Menu from "../components/menu/Menu";
import Profile from "../pages/profile/Profile";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Home from "../pages/home/Home";
import Information from "../pages/information/Information";

import Background from "../components/background/Background";
import Spinner from "../components/spinner/Spinner";
import Modal from "../components/modal/Modal";
import AlertContext from "../contexts/alert/AlertContext";

import Students from "../pages/students/Students";
import NewStudent from "../pages/students/NewStudent";
import EditStudent from "../pages/students/EditStudent";

import Teachers from "../pages/teachers/Teachers";
import NewTeacher from "../pages/teachers/NewTeacher";
import EditTeacher from "../pages/teachers/EditTeacher";

import Courses from "../pages/courses/Courses";
import NewCourse from "../pages/courses/NewCourse";
import EditCourse from "../pages/courses/EditCourse";

import Parallels from "../pages/parallels/Parallels";
import NewParallel from "../pages/parallels/NewParallel";
import EditParallel from "../pages/parallels/EditParallel";

import Subjects from "../pages/subjects/Subjects";
import NewSubject from "../pages/subjects/NewSubject";
import EditSubject from "../pages/subjects/EditSubject";

import Specialties from "../pages/specialties/Specialties";
import NewSpecialty from "../pages/specialties/NewSpecialty";
import EditSpecialty from "../pages/specialties/EditSpecialty";

import AcademicYears from "../pages/academicYears/AcademicYears";
import NewAcademicYear from "../pages/academicYears/NewAcademicYear";
import EditAcademicYear from "../pages/academicYears/EditAcademicYear";



const AppRouter = () => {
  const { isLoading, hasError, modal, setHasError } = useContext(AlertContext);
  const closeModal = () => {
    setHasError(false);
  };
  return (
    <Fragment>
      <Background />
      <Spinner show={isLoading} />
      <Modal
        show={hasError}
        close={closeModal}
        title={modal.title}
        message={modal.message}
      />
      <AuthProvider>
        <Routes>
          <Route
            path="login/*"
            element={
              <PublicRoute>
                <Routes>
                  <Route path="/*" element={<Login />} />
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/resetPassword" element={<ResetPassword />} />
                </Routes>
              </PublicRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Fragment>
                  <Menu />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/information" element={<Information />} />
                    <Route path="/students">
                      <Route path="" element={<Students />} />
                      <Route path="newStudent" element={<NewStudent />} />
                      <Route path=":identification" element={<EditStudent />} />
                    </Route>
                    <Route path="/teachers">
                      <Route path="" element={<Teachers />} />
                      <Route path="newTeacher" element={<NewTeacher />} />
                      <Route path=":identification" element={<EditTeacher />} />
                    </Route>
                    <Route path="/courses">
                      <Route path="" element={<Courses />} />
                      <Route path="newCourse" element={<NewCourse />} />
                      <Route path=":identification" element={<EditCourse />} />
                    </Route>
                    <Route path="/parallels">
                      <Route path="" element={<Parallels />} />
                      <Route path="newParallel" element={<NewParallel />} />
                      <Route path=":identification" element={<EditParallel />} />
                    </Route>
                    <Route path="/subjects">
                      <Route path="" element={<Subjects />} />
                      <Route path="newSubject" element={<NewSubject />} />
                      <Route path=":identification" element={<EditSubject />} />
                    </Route>
                    <Route path="/specialties">
                      <Route path="" element={<Specialties />} />
                      <Route path="newSpecialty" element={<NewSpecialty />} />
                      <Route path=":identification" element={<EditSpecialty />} />
                    </Route>
                    <Route path="/academicYears">
                      <Route path="" element={<AcademicYears />} />
                      <Route path="newAcademicYear" element={<NewAcademicYear />} />
                      <Route path=":identification" element={<EditAcademicYear />} />
                    </Route>
                  </Routes>
                </Fragment>
              </PrivateRoute>
            }
          />
        </Routes>

        {/* <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route element={<DashboardTemplate />}>
                  <Route index path="/" element={<App />} />
                  <Route index path="/directors" element={<ListDirectors />} />
                  <Route
                    index
                    path="/directors/show/:id"
                    element={<ShowDirector />}
                  />
                  <Route
                    index
                    path="/directors/create"
                    element={<CreateDirector />}
                  />
                  <Route
                    index
                    path="/directors/edit/:id"
                    element={<UpdateDirector />}
                  />
                </Route>
              </Routes>
            </PrivateRoute>
          }
        />
        </Routes> */}
      </AuthProvider>
    </Fragment>
  );
};

export default AppRouter;
