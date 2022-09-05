import React, { useState, useEffect } from "react";
import './Movies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { apiBeatFilm } from "../../utils/MoviesApi";
import Search from "../../utils/Search";
import Filter from "../../utils/Filter";

function Movies({onMovieSave, savedFilms}) {
  const [isSearchResultMovies, setIsSearchResultMovies] = useState(JSON.parse(localStorage.getItem("movies")));
  const [isFilterMovies, setIsFilterMovies] = useState(JSON.parse(localStorage.getItem("moviesFilter")));
  const [isPreloader, setIsPreloader] = useState(false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [isCheckBox, setIsCheckBox] =useState(JSON.parse(localStorage.getItem("checkBox")));
  const [isNotFound, setIsNotFound] = useState(false);
  const [isMovieList, setIsMovieList] = useState([]);
  const [query, setQuery] = React.useState(JSON.parse(localStorage.getItem("queryMovies")));
  //запись значений в локальное хранилище
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(isSearchResultMovies));
    localStorage.setItem("moviesFilter", JSON.stringify(isFilterMovies));
    localStorage.setItem("checkBox", JSON.stringify(isCheckBox));
    localStorage.setItem("queryMovies", JSON.stringify(query));
  },[isCheckBox, isFilterMovies, isSearchResultMovies, query]);

  //функция пойска фильмов на странцице Movies
  function handleSearchFilm({query}) {
    setIsNotFound(false);
    setIsPreloader(true);
    setIsSearchErr(false);
    if(isMovieList.length === 0) {
      apiBeatFilm.getFilmInformation()
        .then(movies => {
          setIsMovieList(movies);
          setIsSearchResultMovies(Search(movies, query));
          setIsFilterMovies(Filter(Search(movies, query)));
        })
        .catch(err => {
          console.log(err);
          setIsNotFound(false);
          setIsSearchErr(true);
        }) 
        .finally(() => {
          setIsPreloader(false);
        })
    } else {
      setIsSearchResultMovies(Search(isMovieList, query));
      setIsFilterMovies(Filter(Search(isMovieList, query)));
      setIsPreloader(false);
    }
  }
  //функция переключения короткометражек
  function handleFilterFilm() {
    if(!isCheckBox) {
      setIsCheckBox(true);
    } else {
      setIsCheckBox(false);
    }
  }
  function handleSearchValue(e) {
    setQuery(e.target.value)
  }
  //Очистка инпута от введеных данных по нажатию ESC
  useEffect(() => {function handleEscClose(e) {
    if(e.key === 'Escape') {
      setQuery('');
    }}
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])
  //Сброс результата пойска при удалении поискового запроса
  useEffect(() => {
    if(query === "") {
      setIsNotFound(false);
      setIsSearchResultMovies([]);
      setIsFilterMovies([]);
    }
  },[query])
  return (
    <>
    <SearchForm onSearchFilm={handleSearchFilm} onFilterFilm={handleFilterFilm} isCheckBox={isCheckBox} query={query} SearchValue={handleSearchValue}/>
    {isPreloader ? 
    <Preloader/> : 
    <MoviesCardList searchResult={isCheckBox ? isFilterMovies : isSearchResultMovies} searchErr={isSearchErr} notFound={isNotFound} setNoFound={setIsNotFound} onMovieSave={onMovieSave} savedFilms={savedFilms} query={query}/>}
    </>
  )
};

export default Movies