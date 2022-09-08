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
          <p className="student__text">Я родился в городе Черногорск, сейчас проживаю в Санкт-Петербурге. закончил экономический факультет РУДН (Москва) бакалавриат и магистратура. Я люблю слушать музыку, а ещё увлекаюсь футболом. После обучения в Практикуме, стало понятно что сфера программирования мне близка, и в дальнейшем я планирую искать работу именно в этом направлении.</p>
          <a href="https://github.com/alexholm222" target="blank" className="student__link button-effect">Github</a>
        </div>
        <img src={avatar} alt="Аватар студента" className="student__avatar"></img>
      </div>
    </section>  
  )
};

export default AboutMe