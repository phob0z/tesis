import React, { useState } from "react";
import AlertContext from "./AlertContext";

const AlertProvider = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ title: "ERROR", message: "MESSAGE" });

  return (
    <AlertContext.Provider
      value={{
        isLoading,
        hasError,
        modal,
        setIsLoading,
        setHasError,
        setModal,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
