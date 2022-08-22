import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <div className="filter__line"></div>
      <label className="checkbox">
        <input type="checkbox" name="filterCheckbox" id="filterCheckbox"></input>
        <div className="checkbox__mask"></div>
      </label>  
      <p className="filter__text">Короткометражки</p>
    </div>
  )
};

export default FilterCheckbox