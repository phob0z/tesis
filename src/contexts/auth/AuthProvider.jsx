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
