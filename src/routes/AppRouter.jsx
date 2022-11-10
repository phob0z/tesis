import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import AuthProvider from "../contexts/auth/AuthProvider";

import Background from "../components/templates/Background";
import Menu from "../components/templates/Menu"
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth//ForgotPassword";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Fragment>
      <Background />
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
                {/* <Route element={<DashboardTemplate />}></Route> */}
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
