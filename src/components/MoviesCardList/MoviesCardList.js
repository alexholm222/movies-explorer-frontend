import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({searchResult, searchErr, notFound, setNoFound, onMovieSave, onMovieDelete, savedFilms, query}) {
  const [isMovies, setIsMovies] = useState(0);
  const [isLoadMovies, setIsLoadMovies] = useState(0);
  const [isMoviesButton, setIsMoviesButton] = useState(false);
  const location = useLocation();
  useEffect(() => {
    handleWidthWindow();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        handleWidthWindow()
      }, 200)});
  },[searchResult]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setIsMoviesButton(false)
    } else if (searchResult.length > isMovies) {
      setIsMoviesButton(true)
    } else {
      setIsMoviesButton(false)
    }
  },[isMovies, searchResult]);

  useEffect(() => {
    if (searchResult.length === 0 && query !== "") {
      setNoFound(true)
    } else if(searchErr) {
      setNoFound(false)
    } 
    else {
      setNoFound(false)
    }
  },[searchErr, searchResult, setNoFound]);

  function handleLoadMovies() {
    setIsMovies(isMovies + isLoadMovies)
  }
  
  function handleWidthWindow() {
    const width = window.innerWidth;
    if(width > 1133) {
      setIsMovies(12);
      setIsLoadMovies(3)
    } else if(width > 636) {
      setIsMovies(8);
      setIsLoadMovies(2)
    }
    else {
      setIsMovies(5);
      setIsLoadMovies(2);
    }
  }
  return (
    <section className="movies__gallery">
      <ul className={`movies__list`}>
      {searchResult.map((movie, index) => {
        if(location.pathname === "/movies"){
          if(index < isMovies) {
            return (<MoviesCard key={movie.id} movie={movie} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} savedFilms={savedFilms}/>);
          }
          return null
          } else {
          return (<MoviesCard key={movie.movieId} movie={movie} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} savedFilms={savedFilms}/>);
          }
        })
      }
      </ul>
      <h2 className="movies__error" style={{display: `${searchErr ? "flex" : "none"}`}}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h2>
      <h2 className="movies__nofound" style={{display: `${notFound ? "flex" : "none"}`}}>Ничего не найдено</h2>
      <button onClick={handleLoadMovies} style={{display: `${isMoviesButton ? "block":"none"}`}} type="button" className="movies__button button-effect">Ещё</button>
    </section>
  )
};

export default MoviesCardList