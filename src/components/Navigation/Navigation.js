import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({isNavButton, handleCloseNav}) {
  

  return (
    <>
    <div className="navigation" style={{display: isNavButton ? "flex": "none"}}></div>
    <div className="navigation__conteiner" style={{display: isNavButton ? "flex": "none"}}>
      <div className="navigator__block">   
        <button onClick={handleCloseNav} className="navigation__button"></button>
        <div className="navigation__links">
          <Link to={'/'} onClick={handleCloseNav} className="navigation__link">Главная</Link>
          <Link to={'movies'} onClick={handleCloseNav} className="navigation__link">Фильмы</Link>
          <Link to={'saved-movies'} onClick={handleCloseNav} className="navigation__link">Сохранённые фильмы</Link>
        </div>
      </div>  
      <Link to={'profile'} onClick={handleCloseNav} className="navigator__button_account">Аккаунт</Link>
    </div> 
    </>
  )
}

export default Navigation