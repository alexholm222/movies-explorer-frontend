import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <a href="https://github.com/alexholm222/how-to-learn" target="blank" className="portfolio__link">
          <p className="portfolio__text">Статичный сайт</p>
          <div className="portfolio__icon"></div>
        </a>
        <a href="https://github.com/alexholm222/russian-travel" className="portfolio__link" target="blank">
          <p className="portfolio__text">Адаптивный сайт</p>
          <div className="portfolio__icon"></div>
        </a>
        <a href="https://github.com/alexholm222/react-mesto-api-full" target="blank" className="portfolio__link">
          <p className="portfolio__text">Одностраничное приложение</p>
          <div className="portfolio__icon"></div>
        </a>
      </ul>
    </section>
  )
};

export default Portfolio