import React, { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import AuthProvider from "../contexts/auth/AuthProvider";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Menu from "../components/Menu/Menu";

import Background from "../components/templates/Background";
import Spinner from "../components/atoms/Spinner";
import Modal from "../components/atoms/Modal";
import AlertContext from "../contexts/alert/AlertContext";

const AppRouter = () => {
  const { isLoading, hasError, modal, setHasError } = useContext(AlertContext);
  const closeModal = () => {
    setHasError(false);
  };
  return (
    <Fragment>
      {console.log(process.env.REACT_APP_BACK_URL)}s
      <Background />
      <Spinner show={isLoading}/>
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
                </Routes>
              </PublicRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Routes>
                  <Route path="/" element={<Menu />} />
                </Routes>
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
