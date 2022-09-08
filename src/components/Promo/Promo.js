import React from "react";
import "./Promo.css";


function Promo({handleScroll}) {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo_block">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>  
        <button onClick={handleScroll} type="button" className="promo__button">Узнать больше</button>
      </div>
      <div className="promo__img"></div>
    </section>
  )
};

export default Promo;