import React from "react";
import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader" style={{display: "none"}}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader