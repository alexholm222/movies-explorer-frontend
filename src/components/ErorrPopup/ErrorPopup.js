import React from "react";
import "./ErrorPopup.css";

function ErrorPopup({errorText, isError, closePopup, closeOnOverlay}) {
  return (
    <div onMouseDown={closeOnOverlay} className="errorpop" style={{visibility: `${isError ? "visible" : "hidden"}`, opacity:`${isError ? "1" : "0"}`}}>
      <div className="errorpop__block">  
        <div onClick={closePopup} className="errorpop__button button-effect"></div>  
        <div className="errorpop__container">
          <div className="errorpop__pic"></div> 
          <p className="errorpop__text">{errorText}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorPopup