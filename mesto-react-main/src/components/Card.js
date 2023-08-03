import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

class Card extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);
  }

  handleCardClick = () => {
    this.props.onCardClick(this.props.info);
  };

  handleCardLike = () => {
    this.props.onCardLike(this.props);
  };

  handleCardDelete = () => {
    this.props.onCardDelete(this.props);
  };

  render() {
    return (
      <>
        <img
          className="elements__item-img"
          onClick={this.handleCardClick}
          src={this.props.info.link}
          alt={this.props.info.name}
        />
        {this.props.info.owner._id === this.context._id && (
          <button
            className="elements__trash"
            type="submit"
            onClick={this.handleCardDelete}
          ></button>
        )}
        <div className="elements__item-block">
          <h2 className="elements__item-title">{this.props.info.name}</h2>
          <div className="elements__block-like">
            <button
              type="button"
              className={`elements__btn-like ${
                this.props.info.likes.some(
                  (item) => item._id === this.context._id,
                ) && "elements__btn-like_active"
              }`}
              onClick={this.handleCardLike}
            ></button>
            <span className="elements__amount-likes">
              {this.props.info.likes.length}
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Card;
