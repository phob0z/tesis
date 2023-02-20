import axios from "axios";
import React, { useReducer, useContext } from "react";
import AuthContext from "./AuthContext";

import AlertContext from "../alert/AlertContext";

const AuthProvider = ({ children }) => {
  const { setModal } = useContext(AlertContext);
  const authReducer = (state, action) => {
    if (action.type === "LOGIN") {
      return {
        logged: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    }

    if (action.type === "LOGOUT") {
      return {
        logged: false,
        user: null,
        token: null,
      };
    }

    if (action.type === "PROFILE") {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user: user,
      };
    }
  };

  const initialization = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (token) checkToken(token);
    return {
      logged: !!user,
      user,
      token,
    };
  };

  const checkToken = async (token) => {
    try {
      await axios.get(`${process.env.REACT_APP_BACK_URL}/profile`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      });
    } catch (error) {
      if (error.response.status === 401) {
        setModal({ title: "ERROR", message: error.response.data.message });
      }
    }
  };

  const [authState, dispatch] = useReducer(authReducer, {}, initialization);

  const login = async (user, token) => {
    const action = { type: "LOGIN", payload: { user, token } };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    dispatch(action);
  };

  const logout = () => {
    const action = { type: "LOGOUT" };
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(action);
  };

  const setProfile = (user) => {
    const action = { type: "PROFILE", payload: user };
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
