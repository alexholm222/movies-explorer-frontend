import React, { useState, useEffect } from "react";
import "./MoviesCard.css";
import time from "../../utils/Time";
import { useLocation } from "react-router-dom";

function MoviesCard({movie, onMovieSave, onMovieDelete, savedFilms}) {
  const link ="https://api.nomoreparties.co/";
  const symbol = time(movie.duration);
  const[isImg, setIsImg] = useState(`${link}${movie.image.url}`);
  const[isSaved, setIsSaved] = useState(false);
  const[isButtonLike, setIsButtonLike] = useState(false);
  const location = useLocation();
  useEffect(()=> {
    if (location.pathname === "/movies") {
      setIsButtonLike(savedFilms.some(film => film.movieId === movie.id)) 
    }
  },[onMovieSave, onMovieDelete])
  
  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setIsImg(`${movie.image}`)
      setIsSaved(true)
      setIsButtonLike(true)
    }
  },[]);
  
  function handleSaveMovie() {
    onMovieSave(movie);
  }

  function handleDeleteMovie() {
    onMovieDelete(movie)
  }

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__title">{movie.nameRU}</h2>
        <p className="card__time">{`${movie.duration} минут${symbol}`}</p>
      </div>
      <a href={`${movie.trailerLink}`} target="blanck" className="card__link"><div className="card__hover"></div><img src={isImg} alt= "Обложка фильма" className="card__img" ></img></a>
      <button type="button" onClick={isSaved ? handleDeleteMovie : handleSaveMovie} className={`card__button button-effect ${isButtonLike ? "card__button_saved" : ""} ${isSaved ? "card__button_delete" : ""}`}>{isButtonLike ? "" : "Сохранить"}</button>
    </li>
  )
};

export default MoviesCard