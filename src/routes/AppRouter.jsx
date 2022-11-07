import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/Login";
import AuthProvider from "../contexts/auth/AuthProvider";
import ForgotPassword from "../components/ForgotPassword";
import EmailSent from "../components/EmailSent";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Navigate to="login" />} />
        <Route
          path="login/*"
          element={
            <PublicRoute>
              <Routes>
                <Route path="/*" element={<Navigate to="/login" />} />
                <Route path="/" element={<Login />} />
                <Route path="forgotPassword" element={<ForgotPassword />} />
                <Route path="emailSent" element={<EmailSent />} />
              </Routes>
            </PublicRoute>
          }
        />
      </Routes>

      {/* <Routes>
        <Route element={<AuthTemplate />}>
          <Route path="/*" element={<Navigate to="login" />} />
          <Route path="login" exact element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="emailSent" element={<EmailSent />} />
        </Route>
      </Routes> */}

      {/* <Route
          path="login/*"
          element={
            <PublicRoute>
              <Routes>
                <Route element={<AuthTemplate />}>
                  <Route path="/*" element={<Login />} />
                </Route>
              </Routes>
            </PublicRoute>
          }
        /> */}

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
        /> */}
      {/* </Routes> */}
    </AuthProvider>
  );
};

export default AppRouter;
