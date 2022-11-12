import React, { useReducer } from "react";
import AlertContext from "./AlertContext";

const AlertProvider = ({ children }) => {
  const alertReducer = (state, action) => {
    if (action.type === "LOADING") {
      if (!action.payload)
        return { ...state };
      return {
        ...state,
        isLoading2: action.payload,
      };
    }
    /*     if (action.type === "LOADING") {
          return { ...state };
        }
        if (action.type === "SETERROR") {
          return {
            ...state,
            hasError: action.payload,
          };
        }
        if (action.type === "ERROR") {
            return { ...state };
        } */
  };

  const initialization = () => {
    const modal = {
      title: "MODAL",
      message: "MESSAGE",
    };
    const isLoading2 = false;
    // const hasError = false;
    return {
      modal: modal,
      isLoading2: isLoading2,
      // hasError: hasError,
    };
  };

  const [alertState, dispatch] = useReducer(alertReducer, {}, initialization);

  const isLoading = () => {
    const action = { type: "LOADING" };
    dispatch(action);
  }
  const setIsLoading = (isLoading2) => {
    const action = { type: "LOADING", payload: isLoading2 };
    dispatch(action);
  };

  /* 
    const hasError = () => {
      const action = { type: "ERROR" };
      dispatch(action);
    }
    const setHasError = (hasError) => {
      const action = { type: "SETERROR", payload: hasError };
      dispatch(action);
    };
  */

  return (
    <AlertContext.Provider
      value={{
        ...alertState,
        isLoading: isLoading,
        // hasError,
        setIsLoading: setIsLoading,
        // setHasError,
      }}
    >
      {/* {children} */}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
