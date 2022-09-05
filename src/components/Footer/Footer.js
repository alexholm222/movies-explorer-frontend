import React from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  let setFooter = "" 
  const location = useLocation();
  if (location.pathname === "/") {
    setFooter = "enabled";
   } else if (location.pathname ==="/movies") {
    setFooter= "enabled";
   } else if (location.pathname ==="/saved-movies") {
    setFooter = "enabled";
   }

  return (
    <footer className={`footer footer__${setFooter}`}>
       <div className="footer__content">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
       </div>
       <div className="footer__conteiner">
        <p className="footer__text footer__text_year">&#169; 2022</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/" className="footer__link button-effect" target="blank">Яндекс.Практикум</a>
          <a href="https://github.com/" className="footer__link button-effect" target="blank">Github</a>
        </div>
        </div> 
    </footer>
  )
};

export default Footer