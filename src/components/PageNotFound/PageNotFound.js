import React from "react";
import './PageNotFound.css';
import { Link, useNavigate } from "react-router-dom";

function PageNotFound() {
  const nav = useNavigate();
  return (
    <div className="pagenot">
      <p className="pagenot__code">404</p> 
      <p className="pagenot__text">Страница не найдена</p>
      <button onClick={()=> {nav(-1)}} className="pagenot__button button-effect">Назад</button>   
    </div>
  )
}

export default PageNotFound