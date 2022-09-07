import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({onSearchFilm, onSearchSavedFilm, onFilterFilm, isCheckBox, query, SearchValue}) {
  const [isError, setIsError] = useState(false); 
  useEffect(() => {
    setIsError(false)
  },[query])
  
  function handleSubmit(e) {
    e.preventDefault();
    if (location.pathname === "/movies") {
      if(query !== "") {
        onSearchFilm({query})
      } else {
        setIsError(true)
      }
     } else if (location.pathname ==="/saved-movies") {
      if(query !== "") {
        onSearchSavedFilm({query});
      } else {
        setIsError(true)
      }
     }
  }

  let search = "none"
  const location = useLocation();

  if (location.pathname === "/movies") {
    search = "flex";
   } else if (location.pathname ==="/saved-movies") {
    search = "flex";
   }

  return (
    <section className="search" style={{display: search}}>
      <div className="search__block">
        <form noValidate onSubmit={handleSubmit} className="search__form">
          <div className="search__container">
            <div className="search__img"></div>
            <input value={query || ''} onChange={SearchValue} required className="search__input" type="text" placeholder="Фильм" name = "search" autoComplete="off"></input>
            <span className="search__span">{isError ? "Нужно ввести ключевое слово" : ""}</span>
          </div> 
          <button type="submit" className="search__button"></button>
        </form>
        <FilterCheckbox onFilterFilm={onFilterFilm} isCheckBox={isCheckBox}/>
      </div>
      <div className="search__line"></div>
    </section>
  )
};

export default SearchForm
