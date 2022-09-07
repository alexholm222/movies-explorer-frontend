import React, { useState, useEffect } from "react";
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import ErrorPopup from "../ErorrPopup/ErrorPopup";
import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { apiSavedFilm } from "../../utils/MainApi";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { useNavigate, Navigate } from "react-router-dom";
import * as Auth from "../../utils/Auth";
import ProtectedRoute from "../../utils/ProtectedRoute";
import {ERROR_TEXT_USER, ERROR_TEXT_SAVE_MOVIE, ERROR_TEXT_DELETE_MOVIE, 
        ERROR_CODE_UNAUTHORIZATION} from "../../utils/Сonstants";

function App() {
  const [isNavButton, setIsNavButton] = useState(false);
  const [isSavedMovies, setIsSavedMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const isLogin = JSON.parse(localStorage.getItem('isLogin')) || false;
  const token = localStorage.getItem('token');
  const nav = useNavigate();
  useEffect(() => {
    if (token) {
         Auth.getContent(token)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          if(err.status === ERROR_CODE_UNAUTHORIZATION) {
            handleSingOut();
          } else {
            setIsError(true);
            setErrorText(ERROR_TEXT_USER)
            console.log(err)
          }
        });}
  },[token]);

  useEffect(() => {
    setIsSearchErr(false)
    setIsPreloader(true)
    if(isLogin) {
      apiSavedFilm.getFilmInformation(token)
      .then(films => {
        setIsSavedMovies(films.data.reverse());
      })
      .catch(err => {
        setIsSearchErr(true);
        if(err.status === ERROR_CODE_UNAUTHORIZATION) {
          handleSingOut();
        } else {
          console.log(err)
        }
      })
      .finally(() => {
        setIsPreloader(false)
      })
    }
  },[isLogin, token])

  function handleCloseNav() {
    setIsNavButton(false)
  }

  function handleOpenNav() {
    setIsNavButton(true)
  }
//функция сохранение фильмов и их удаления при изменении состояния кнопки лайк 
  function handleMovieSave(movie) {
    if(!isSavedMovies.some(film => film.movieId === movie.id)) {
      apiSavedFilm.saveMovie(movie, token)
        .then((savedMovie) => {
          setIsSavedMovies([savedMovie.data, ...isSavedMovies])
        })
        .catch(err => {
          if(err.status === ERROR_CODE_UNAUTHORIZATION) {
            handleSingOut();
          } else {
            setIsError(true);
            setErrorText(ERROR_TEXT_SAVE_MOVIE);
            console.log(err)
          }
        })
      } else {
        const film = isSavedMovies.filter((c)=> c.movieId === movie.id)[0];
        handleDeleteMovie(film)
      }
  }
//функция удаление сохраненых фильмов
  function handleDeleteMovie(movie) {
    apiSavedFilm.deleteMovies(movie._id, token)
    .then(() => {
      setIsSavedMovies((state) => state.filter((c)=> c._id !== movie._id ))  
    })
    .catch(err => {
      if(err.status === ERROR_CODE_UNAUTHORIZATION) {
        handleSingOut();
      } else {
        setIsError(true);
        setErrorText(ERROR_TEXT_DELETE_MOVIE);
        console.log(err)
      }
    })
  }
  //функция выхода
  function handleSingOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogin');
    localStorage.setItem("movies", JSON.stringify([]));
    localStorage.setItem("moviesFilter", JSON.stringify([]));
    localStorage.setItem("checkBox", JSON.stringify(false));
    localStorage.setItem("queryMovies", JSON.stringify(''));
    localStorage.setItem("currentUser", JSON.stringify({ }));
    setCurrentUser({});
    nav("/");
  }

  function closePopup() {
    setIsError(false);
  }

  function closeOnOverlay(e) { 
    if (e.target === e.currentTarget) { 
      closePopup(); 
    } 
  } 

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <ErrorPopup isError={isError} errorText={errorText} closePopup={closePopup} closeOnOverlay={closeOnOverlay}/>
      <Navigation handleCloseNav={handleCloseNav} isNavButton={isNavButton}/>
      <Header handleOpenNav={handleOpenNav}  loggedIn={isLogin}/>
      <main className="main">
        <Routes>
          <Route  path="/" element={<Main/>}/>
          <Route  path="movies" element={<ProtectedRoute loggedIn={isLogin} 
            component={Movies} onMovieSave={handleMovieSave} savedFilms={isSavedMovies}/>}
          />
          <Route path="/saved-movies" element={<ProtectedRoute loggedIn={isLogin}
            component={SavedMovies} SavedMovies={isSavedMovies} setSavedMovies={setIsSavedMovies} isPreloader={isPreloader} isSearchErr={isSearchErr} onMovieDelete={handleDeleteMovie}/>}
          />  
          <Route path="/profile" element={<ProtectedRoute loggedIn={isLogin}
            component={Profile} singOut={handleSingOut} setCurrentUser={setCurrentUser}/>}
          />
          <Route path="/signup" element={ !isLogin ? <Register/> : <Navigate to="/movies" replace/>}/>
          <Route path="/signin" element={ !isLogin ? <Login/> : <Navigate to="/movies" replace/>}/>
          <Route path="*" element={<PageNotFound/>}/> 
        </Routes>
      </main>
      <Footer/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
