import { useContext, useEffect, useState } from "react";
import './Profile.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Validator from "../../utils/Validator";
import { apiSavedFilm } from "../../utils/MainApi";

function Profile({singOut, setCurrentUser, token}) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStyle, setErrorStyle] = useState(false);
  const [isSucssesMessage, setIsSucssesMessage] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const validator = Validator();
  const [disable, setDisable] = useState(false);
  
  useEffect(()=>{
    validator.setValues({
      name: currentUser.data.name,
      email: currentUser.data.email
    })
  },[currentUser]);

  useEffect(() => {
    if (currentUser.data.name === validator.values.name && currentUser.data.email === validator.values.email) {
      setDisable(false);
    } else {
      setDisable(validator.isValid)
    }
    setIsSucssesMessage(false);
  },[validator.values.email, validator.values.name])


  useEffect(() => {
    setError(false);
    setErrorStyle(false);
    setIsSucssesMessage("");
  },[validator.values.email])
   // функция обновление данных пользователя 
  function handleSubmit(e) {
    e.preventDefault();
    apiSavedFilm.submitUserInform(validator.values.name, validator.values.email, token) 
    .then((user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsSucssesMessage(true);
      setDisable(false);
    })
    .catch((err) => {
      setError(true);
      if (err.status === 409) {
        setErrorStyle(true);
        setErrorMessage('Данный email уже занят');
      } else {
        setErrorStyle(false);
        setErrorMessage('Проблемы с интерне соединением');
      }
    }); 
  }
  return(
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.data.name}`}</h2> 
      <form noValidate onSubmit={handleSubmit} className="profile__form" id="profile-form" name="profile">
        <div className="profile__name">
           <p className="profile__text">Имя</p>
           <input pattern="^([a-zA-Zа-яА-Я\s-]{2,30})+$" value={validator.values.name || ""} onChange={validator.handleChange} className="profile__input profile__text" type="text" name="name" required></input>     
        </div> 
        <span className="profile__error profile__error_name">{validator.errors.name}</span>
        <div className="profile__line"></div>
        <div className="profile__email">
           <p className="profile__text">E-mail</p>
           <input pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" value={validator.values.email || ""} onChange={validator.handleChange}  className={`profile__input profile__text ${errorStyle ? "error" : ""}`}  type="email" name="email" required></input>
        </div>
        <span className="profile__error profile__error_email">{error ? errorMessage : validator.errors.email}</span> 
      </form>
      <span className="profile__message">{isSucssesMessage ? "Данные успешно обновлены!" : "" }</span> 
      <div className="profile__buttons">
        <button disabled={!disable ? "disabled" : ""} type="submit" form="profile-form" className={`profile__button ${!disable ? "" : "button-effect"}`} >Редактировать</button>
        <button onClick={singOut} type="button" className="profile__link button-effect">Выйти из аккаунта</button>
      </div>     
    </section>
  )
};

export default Profile