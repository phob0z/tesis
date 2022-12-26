import React, { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import AuthProvider from "../contexts/auth/AuthProvider";

import Login from "../pages/auth/Login";
// import Login from "../pages/auth/Login2";
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
                    <Route
                      path="/"
                      element={
                          <Home />
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                          <Profile />
                      }
                    />
                    <Route
                      path="/information"
                      element={
                        <Information />
                      }
                    />
                    <Route
                      path="/students"
                      element={
                        <Students />
                      }
                    />
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
