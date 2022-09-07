import { useEffect, useState } from "react";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../../utils/Auth"
import Validator from "../../utils/Validator";
import {ERROR_CODE_UNAUTHORIZATION, ERROR_CODE_BAD_REQUEST, 
        ERROR_MESSAGE_AUTH_BAD, ERROR_MESSAGE_AUTH_INTERNET} from "../../utils/Сonstants";

function Login() {
  const validator = Validator();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStyle, setErrorStyle] = useState(false);
  const [inputDisable, setInputDisable] = useState(false);
  const disable = validator.isValid;
  const nav = useNavigate()

  useEffect(() => {
    setError(false);
    setErrorStyle(false);
  },[validator.values]);

  function handleSubmitLogin(e) {
    e.preventDefault();
    setInputDisable(true);
      Auth.authorize(validator.values.email, validator.values.password)
        .then((data) => {
          if(data.token) {
            nav('/movies');
            localStorage.setItem('isLogin', true);
            Auth.getContent(data.token)
            .then((user) => {
              localStorage.setItem('currentUser', JSON.stringify(user));
            })
            .catch(err => console.log(err))
          } 
      })
      .catch((err) => {
        setError(true);
        if (err.status === ERROR_CODE_BAD_REQUEST || err.status === ERROR_CODE_UNAUTHORIZATION) {
          setErrorStyle(true);
          setErrorMessage(ERROR_MESSAGE_AUTH_BAD);
        } else {
          setErrorStyle(false);
          setErrorMessage(ERROR_MESSAGE_AUTH_INTERNET);
        }
      })
      .finally(() => {
        setInputDisable(false);
      })
  }
  return (
    <section className="login">
      <div className="auth__container">
        <Link to={'/'} className="header__link">
          <div className="logo"></div>
        </Link>
        <h2 className="auth__title">Рады видеть!</h2> 
      </div>  
      <form noValidate onSubmit={handleSubmitLogin} className="auth__form" name="authLogin">
        <div className="auth__blocks">
          <p className="auth__text">E-mail</p>
          <div className="auth__block">
            <input disabled={inputDisable ? "disabled" : ""} pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" value={validator.values.email || ''} onChange={validator.handleChange} type="email" id="input-email" name="email" required className={`auth__input ${errorStyle ? "error" : ""}`}></input>
          </div> 
          <span className="auth__error">{validator.errors.email}</span> 
          <p className="auth__text" >Пароль</p>
          <div className="auth__block">
            <input disabled={inputDisable ? "disabled" : ""} value={validator.values.password || ''} onChange={validator.handleChange} className={`auth__input ${errorStyle ? "error" : ""}`} type="password" id="input-password" name="password" required ></input>
          </div>
          <span className="auth__error">{error ? errorMessage : validator.errors.password}</span>  
        </div>  
        <button disabled={!disable ? "disabled" : ""}  type="submit" className={`auth__button auth__button_login  ${!disable ? "" : "button-effect"}`}>Войти</button>
      </form>
      <p className="auth__subtitle">Ещё не зарегистрированы? <Link className="auth__link button-effect" to={"/signup"}>Регистрация</Link></p>
    </section>
  )
};

export default Login