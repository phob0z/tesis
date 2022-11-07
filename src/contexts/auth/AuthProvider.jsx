import React, { useReducer } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const authReducer = (state, action) => {
    if (action.type === "LOGIN") {
      return {
        ...state,
        logged: true,
        user: action.payload,
      };
    }
    if (action.type === "LOGOUT") {
      return {
        ...state,
        logged: false,
        user: null,
      };
    }
  };

  const initialization = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      logged: !!user,
      user: user,
    };
  };

  const [authState, dispatch] = useReducer(authReducer, {}, initialization);

  const login = async (user, token) => {
    const action = { type: "LOGIN", payload: user };
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

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
