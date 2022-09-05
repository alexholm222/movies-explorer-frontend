import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({onSearchFilm, onSearchSavedFilm, onFilterFilm, isCheckBox, query, SearchValue}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (location.pathname === "/movies") {
      onSearchFilm({query})
     } else if (location.pathname ==="/saved-movies") {
      onSearchSavedFilm({query})
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
        <form  onSubmit={handleSubmit} className="search__form">
          <div className="search__container">
            <div className="search__img"></div>
            <input value={query || ''} onChange={SearchValue} required className="search__input" type="text" placeholder="Фильм"></input>
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
