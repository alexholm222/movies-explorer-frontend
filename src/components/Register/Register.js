import React from "react";
import './Register.css';
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <div className="auth__container">
        <Link to={'/'} className="header__link">
          <div className="logo"></div>
        </Link>
        <h2 className="auth__title">Добро пожаловать!</h2> 
      </div>  
      <form className="auth__form" name="authRegister">
        <div className="auth__blocks">
          <p className="auth__text">Имя</p>
          <div className="auth__block">
            <input className="auth__input" type="text" id="input-name" name="inputName" required></input>
          </div> 
          <p className="auth__text">E-mail</p>
          <div className="auth__block">
            <input type="email" id="input-email" name="inputEmail" required className="auth__input"></input>
          </div>   
          <p className="auth__text" >Пароль</p>
          <div className="auth__block">
            <input className="auth__input" type="password" id="input-password" minLength="7" maxLength="20" name="inputPassword" required></input>
          </div>   
          <span className="auth__error">Что-то пошло не так...</span>
        </div>
        <button type="submit" className="auth__button auth__button_register button-effect">Зарегистрироваться</button>
      </form>
      <p className="auth__subtitle">Уже зарегистрированы? <Link className="auth__link button-effect" to={"/signin"}>Войти</Link></p>
    </section>
  )
};

export default Register