import React from "react";
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Movies from "../Movies/Movies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function App() {
  const [isNavButton, setIsNavButton] = React.useState(false);
  
  function handleCloseNav() {
    setIsNavButton(false)
  }

  function handleOpenNav() {
    setIsNavButton(true)
  }

  return (
    <div className="page">
      <Navigation handleCloseNav={handleCloseNav} isNavButton={isNavButton}/>
      <Header handleOpenNav={handleOpenNav}/>
      <main>
        <SearchForm/>
        <Preloader/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/saved-movies" element={<MoviesCardList/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/signin" element={<Login/>}/>
          <Route path="*" element={<PageNotFound/>}/> 
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
