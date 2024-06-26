import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalUser from "../Modals/Modal_User/modalUser";
import "./styles.css"

export const NavBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const username = localStorage.getItem("username");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <header>
        <div className="logo_container">
          <img src="/src/assets/images/GENIALACADEMY_LOGO.png" alt="" />
        </div>
        <nav className="nav_container">
            <ul className="nav">
              <li className="header__nav__item">
                <Link to='/home' className="nav_link">
                  Inicio
                </Link>
              </li>
              <li className="header__nav__item">
                <Link to='/home/:uni_id' className="nav_link">
                  Universidades
                </Link>
              </li>
              <li className="header__nav__item">
                <Link to='/library' className="nav_link">
                  Biblioteca Virtual
                </Link>
              </li>
            </ul>
        </nav>
        <div className="actions_container">
            <button onClick={handleOpenModal} className="open-modal-button">
            </button>
            <span>Bienvenido, {username}</span>
        </div>
        <ModalUser isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
};
