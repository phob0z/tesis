import axios from "axios";
import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
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
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload(true);
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
