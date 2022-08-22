import React from "react";
import './Profile.css';
import { Link } from "react-router-dom"

function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  let name = "Алексей"

  function handleSaveProfileClick() {
    setIsEditProfileOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSaveProfileClick()
  }
  
  return(
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${name}`}</h2> 
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__name">
           <p className="profile__text">Имя</p>
           <input className="profile__input profile__text" disabled={`${isEditProfileOpen ? "": "disabled"}`} type="text" required></input>
        </div>
        <div className="profile__line"></div>
        <div className="profile__email">
           <p className="profile__text">E-mail</p>
           <input className="profile__input profile__text" disabled={`${isEditProfileOpen ? "": "disabled"}`} type="text" required></input>
        </div>
        <button className="profile__button button-effect" style={{display:`${isEditProfileOpen ? "":"none"}`}}>Сохранить</button>
      </form>
      <div className="profile__buttons">
        <button  className="profile__button button-effect" style={{display:`${isEditProfileOpen ? "none":""}`}} onClick={handleEditProfileClick}>Редактировать</button>
        <Link to={'#'} className="profile__link button-effect">Выйти из аккаунта</Link>
      </div>     
    </section>
  )
};

export default Profile