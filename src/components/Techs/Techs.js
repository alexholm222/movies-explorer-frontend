import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <div className="title">
        <h2 className="title__text">Технологии</h2>
        <div className="title__line"></div>
      </div>
      <div className="techs__container">
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__gallery">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">mongoDB</li>
        </ul>
      </div>
    </section>
  )
};

export default Techs