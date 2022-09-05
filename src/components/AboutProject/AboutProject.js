import React from "react";
import "./AboutProject.css";

function AboutProject({myRef}) {
  return (
    <section className="project" ref={myRef}>
      <div className="title">
        <h2 className="title__text">О проекте</h2>
        <div className="title__line"></div>
      </div>
        <div className="project__container">
          <div className="project__content">
            <h2 className="project__title">Дипломный проект включал 5 этапов</h2>
            <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p> 
          </div>
          <div className="project__content">
            <h2 className="project__title">На выполнение диплома ушло 5 недель</h2> 
            <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p> 
          </div>
        </div>
        <div className="project__timetable">
          <div className="project__backend">1 неделя</div>
          <div className="project__fronted">4 недели</div> 
        </div>
        <div className="project__subscription">
          <p className="project__text project__text_backend">Back-end</p>
          <p className="project__text project__text_fronted">Front-end</p>
        </div>
    </section>
  )
};

export default AboutProject