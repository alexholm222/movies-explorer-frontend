import React from "react";
import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import { useRef } from "react";

function Main() {
  const myRef = useRef(null);

  function handleScroll() {
    myRef.current.scrollIntoView({behavior: "smooth"});
  }
  return (
    <>
      <Promo handleScroll={handleScroll}/>
      <AboutProject myRef={myRef}/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </>
  )
}

export default Main