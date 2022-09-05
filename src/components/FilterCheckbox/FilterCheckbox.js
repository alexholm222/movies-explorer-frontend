import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({onFilterFilm, isCheckBox}) {

  return (
    <div className="filter">
      <div className="filter__line"></div>
      <label className="checkbox">
        <input onChange={onFilterFilm} checked={isCheckBox} type="checkbox" name="filterCheckbox" id="filterCheckbox"></input>
        <div className="checkbox__mask"></div>
      </label>  
      <p className="filter__text">Короткометражки</p>
    </div>
  )
};

export default FilterCheckbox