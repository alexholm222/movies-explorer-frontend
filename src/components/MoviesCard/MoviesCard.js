import React from "react";
import "./MoviesCard.css";

function MoviesCard() {
  let button_text = ""    
  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__title">В погоне за Бенкси</h2>
        <p className="card__time">27 минут</p>
      </div>
      <div className="card__img"></div>
      <button className="card__button card__button_delete button-effect">{button_text}</button>
    </li>
  )
};

export default MoviesCard