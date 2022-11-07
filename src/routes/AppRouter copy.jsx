import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import App from "../pages/app/App";
// import Login from "../pages/auth/Login";
import Login from "../components/Login";
// import { AuthTemplate } from "../components";
import AuthProvider from "../contexts/auth/AuthProvider";
// import { PrivateRoute } from "./PrivateRoute";
// import { PublicRoute } from "./PublicRoute";
// import { DashboardTemplate } from "../components/templates/DashboardTemplate";
// import { ListDirectors } from "../pages/directors/ListDirectors";
// import { ShowDirector } from "../pages/directors/ShowDirector";
// import { CreateDirector } from "../pages/directors/CreateDirector";
// import { UpdateDirector } from "../pages/directors/UpdateDirector";
// import Background from "../components/Background";
import AuthTemplate from "../components/templates/AuthTemplate";
import ForgotPassword from "../components/ForgotPassword";
import EmailSent from "../components/EmailSent";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthTemplate />}>
          <Route path="/*" element={<Navigate to="login" />} />
          <Route path="login" exact element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="emailSent" element={<EmailSent />} />
        </Route>
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
      </Routes>
    </AuthProvider>
  );
};

export default AppRouter;
