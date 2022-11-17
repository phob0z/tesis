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

    if (action.type === "USER") {
      const user = JSON.parse(localStorage.getItem("user"));
      user.full_name = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user: user,
      };
    }
  };

  const initialization = () => {
    // Hacer una llamada a un API CheckToken, enviar usuario y el token, si devuelve correcto,
    // el token está bien si devuelve falso, logged: false, user: null
    const user = JSON.parse(localStorage.getItem("user"));
    // const token = localStorage.getItem("token");
    return {
      // logged: !!user&&!!token,
      logged: !!user,
      // user: !!user&&!!token? user: null,
      user
    };
  };

  const [authState, dispatch] = useReducer(authReducer, {}, initialization);

  const login = async (user, token) => {
    const action = { type: "LOGIN", payload: user };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    // const user2 = { ...user, token };
    // console.log(user2);
    dispatch(action);
  };

  const logout = () => {
    const action = { type: "LOGOUT" };
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(action);
  };

  const setUser = (user) => {
    const action = { type: "USER", payload: user };
    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
