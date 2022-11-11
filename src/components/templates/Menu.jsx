import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import Backdrop from "../atoms/Backdrop";
import Modal from "../atoms/Modal";
import { useState } from "react";

const Menu = () => {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const location = useLocation();
  // const urlActual = location.pathname;
  const token = localStorage.getItem("token");

  console.log(user.role);

  const onLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        { headers: { accept: "application/json", authorization: token } }
      );
      navigate("/login", { replace: true });
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      Holi {user.full_name}
      <br />
      <button type="button" onClick={onLogout}>
        Logout
      </button>
      <button type="button" onClick={showModal}>
        Modal
      </button>
      <Backdrop show={modalIsOpen} />
      <Modal show={modalIsOpen} closed={closeModal} title="MODAL" message="Mensajito"/>
    </Fragment>
  );
};

export default Menu;
