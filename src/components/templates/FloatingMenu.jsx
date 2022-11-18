import React, { Fragment, useContext, useEffect } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { setIsLoading, setHasError } = useContext(AlertContext);

  useEffect(() => {
    console.log(user.role);
  }, [user]);

  const token = localStorage.getItem("token");

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BACK_URL}/logout`,
        // "http://127.0.0.1:8000/api/logout",
        {},
        { headers: { accept: "application/json", authorization: token } }
      );
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </Fragment>
  );
};

export default Menu;
