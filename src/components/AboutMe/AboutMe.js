import React from "react";
import "./AboutMe.css";
import avatar from "../../images/student_avatar.jpg"

function AboutMe() {
  return (
    <section className="student">
      <div className="title">
        <h2 className="title__text">Студент</h2>
        <div className="title__line"></div>
      </div>
      <div className="student__container">
        <div className="student__info">
          <h2 className="student__title">Алексей</h2>
          <h3 className="student__subtitle">Фронтенд-разработчик, 28 лет</h3>
          <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы</p>
          <a href="https://github.com/alexholm222" target="blank" className="student__link button-effect">Github</a>
        </div>
        <img src={avatar} alt="Аватар студента" className="student__avatar"></img>
      </div>
    </section>  
  )
};

export default AboutMe