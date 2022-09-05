import { useState, useEffect } from "react";
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../../utils/Auth"
import Validator from "../../utils/Validator";

function Register() {
  const validator = Validator();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStyle, setErrorStyle] = useState(false);
  const disable = validator.isValid;
  const nav = useNavigate();

  useEffect(() => {
    setError(false);
    setErrorStyle(false);
  },[validator.values.email])

  function handleSubmitRegister(e) {
    e.preventDefault()
    Auth.register(validator.values)
    .then(() => {
     return Auth.authorize(validator.values.email, validator.values.password)
    })
    .then((data)=> {
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
        if (err.status === 409) {
          setErrorStyle(true);
          setErrorMessage('Пользователь с таким email уже зарегистрирован');
        } else {
          setErrorStyle(false);
          setErrorMessage('Проблемы с интерне соединением');
        }
      });
  }

  return (
    <section className="register">
      <div className="auth__container">
        <Link to={'/'} className="header__link">
          <div className="logo"></div>
        </Link>
        <h2 className="auth__title">Добро пожаловать!</h2> 
      </div>  
      <form noValidate onSubmit={handleSubmitRegister} className="auth__form" name="authRegister">
        <div className="auth__blocks">
          <p className="auth__text">Имя</p>
          <div className="auth__block">
            <input pattern="^[a-zA-Zа-яА-Я\s-]+$" value={validator.values.name || ''} onChange={validator.handleChange} className="auth__input" type="text" id="input-name" name="name" required></input>
          </div> 
          <span className="auth__error">{validator.errors.name}</span>
          <p className="auth__text">E-mail</p>
          <div className="auth__block">
            <input pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" value={validator.values.email || ''} onChange={validator.handleChange} type="email" id="input-email" name="email" required className={`auth__input ${errorStyle ? "error" : ""}`}></input>
          </div>
          <span className="auth__error">{validator.errors.email}</span>   
          <p className="auth__text" >Пароль</p>
          <div className="auth__block">
            <input value={validator.values.password || ''} onChange={validator.handleChange} className="auth__input" type="password" id="input-password" name="password" required></input>
          </div>   
          <span className="auth__error">{error ? errorMessage : validator.errors.password}</span>
        </div>
        <button disabled={!disable ? "disabled" : ""} type="submit" className="auth__button auth__button_register button-effect">Зарегистрироваться</button>
      </form>
      <p className="auth__subtitle">Уже зарегистрированы? <Link className="auth__link button-effect" to={"/signin"}>Войти</Link></p>
    </section>
  )
};

export default Register