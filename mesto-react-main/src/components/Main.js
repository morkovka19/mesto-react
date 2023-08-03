import React from "react";
import profileIconPen from "../images/icon/pen.svg";
import profileIcon from "../images/icon/Edit-Button-min.svg";
import plus from "../images/icon/plus.svg";
import api from "../utils/api.js";
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class Main extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="main">
        <section className="profile root__container-center">
          <div className="profile__block-author">
            <img
              className="profile__avatar"
              src={this.context?.avatar}
              alt="фото автора"
            />
            <div
              className="profile__block-pen"
              onClick={this.props.onEditAvatar}
            >
              <img
                className="profile__icon-pen"
                src={profileIconPen}
                alt="иконка редактирования аватара"
              />
            </div>
            <div className="profile__block-info">
              <div className="profile__block-title">
                <h1 className="profile__title">{this.context?.name}</h1>
                <button
                  type="button"
                  className="profile__btn-redaction"
                  onClick={this.props.onEditProfile}
                >
                  <img
                    className="profile__icon"
                    src={profileIcon}
                    alt="иконка для редактирования"
                  />
                </button>
              </div>
              <p className="profile__subtitle">{this.context?.about}</p>
            </div>
          </div>
          <button
            className="profile__btn"
            type="button"
            onClick={this.props.onAddPlace}
          >
            <img
              className="profile__btn-icon"
              alt="плюс на кнопке добавить"
              src={plus}
            />
          </button>
        </section>
        <section className="elements root__container-center">
          <ul className="elements__group">
            {this.props.cards.map((card, i) => (
              <li className="elements__item" key={card._id}>
                <Card
                  info={card}
                  onCardClick={this.props.onCardClick}
                  onCardLike={this.props.onCardLike}
                  onCardDelete={this.props.onCardDelete}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
  }
}

export default Main;
