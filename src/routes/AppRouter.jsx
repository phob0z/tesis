import React, { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import AuthProvider from "../contexts/auth/AuthProvider";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
// import Menu from "../components/menu/Menu";
import Menu2 from "../components/menu/Menu2";
// import Profile from "../pages/profile/Profile";
import Profile2 from "../pages/profile/Profile2";
import Home from "../pages/home/Home";
import Information from "../pages/information/Information";

import Background from "../components/background/Background";
import Spinner from "../components/spinner/Spinner";
import Modal from "../components/modal/Modal";
import AlertContext from "../contexts/alert/AlertContext";


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
                  {/* <Menu /> */}
                  <Menu2 />
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
                          <Profile2 />
                      }
                    />
                    <Route
                      path="/information"
                      element={
                        <Information />
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
