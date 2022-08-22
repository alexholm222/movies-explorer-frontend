import React from "react";
import './Login.css';
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <div className="auth__container">
        <Link to={'/'} className="header__link">
          <div className="logo"></div>
        </Link>
        <h2 className="auth__title">Рады видеть!</h2> 
      </div>  
      <form className="auth__form" name="authRegister">
        <p className="auth__text">E-mail</p>
        <div className="auth__block">
          <input type="email" id="input-email" name="inputEmail" required className="auth__input"></input>
        </div>  
        <p className="auth__text" >Пароль</p>
        <div className="auth__block">
          <input className="auth__input" type="password" id="input-password" minLength="7" maxLength="20" name="inputPassword" required></input>
        </div>  
        <span className="auth__error">Что-то пошло не так...</span>
        <button className="auth__button auth__button_login button-effect">Войти</button>
      </form>
      <p className="auth__subtitle">Ещё не зарегистрированы? <Link className="auth__link button-effect" to={"/signup"}>Регистрация</Link></p>
    </section>
  )
};

export default Login