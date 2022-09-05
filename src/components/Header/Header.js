import React, { useState } from "react";
import "./Header.css";
import { useLocation, Link } from "react-router-dom";

function Header({handleOpenNav, loggedIn}) {
  let isbackGround = false;
  let headerLanding = "";
  let headerMain = "";
  let activeMovies = "";
  let activSave ="";
  const location = useLocation();

  if (location.pathname === "/movies") {
    headerMain = "active";
    headerLanding = "";
    activeMovies = "active";
  } else if (location.pathname ==="/profile") {
    headerMain = "active";
    headerLanding = ""
  } else if (location.pathname ==="/saved-movies") {
    headerMain = "active";
    headerLanding = "";
    activSave ="active";
  } else if (location.pathname ==="/") {
    if(loggedIn) {
      headerMain = "active";
      headerLanding = "";
      isbackGround = true;
    } else {
      headerMain = "";
      headerLanding = "active";
    }
  } 
  return (
    <>
      <header className={`header header_type_movies header__${headerMain}`} style={{backgroundColor: `${isbackGround ? "#F3C1F8": "#ffff"}`}}>
        <div className="header__container">
          <Link to={'/'} className="header__link">
            <div className="logo header__logo"></div>
          </Link>  
          <Link to={'movies'} className={`header__link header__link_${activeMovies} header__link_movies button-effect`}>Фильмы</Link>
          <Link to={'saved-movies'} className={`header__link header__link_${activSave} header__link_saved button-effect`}>Сохраненные фильмы</Link>
        </div>
        <div className={`${isbackGround ? "" : "header__button_overflow"}`}>
          <Link to={'profile'} className={`header__button ${isbackGround ? "header__button_type_landing": "header__button_type_account"} `}>Аккаунт</Link>
        </div>
        <button onClick={handleOpenNav} type="button" className="header__button header__button_type_navigator"></button>
      </header>
      <header className={`header header_type_landing header__${headerLanding}`}>
        <Link to={'/'} className="header__link">
          <div className="logo header__logo"></div>
        </Link>  
        <div className="header__container">
          <Link to={'signup'} className="header__link header__link_signup button-effect">Регистрация</Link>
          <Link to={'signin'} className="header__button header__button_type_signin">Войти</Link>
        </div>
      </header>
    </>
    )
};

export default Header
