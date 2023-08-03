import React from "react";
import closeIcon from "../images/icon/close-icon-min.svg";

class ImagePopup extends React.Component {
  render() {
    return (
      <section
        className={`popup popup_opacity popup-card ${
          this.props.card ? "popup_opened" : ""
        }`}
        id="popup-card"
      >
        <div className="popup__card-container">
          <button
            className="popup__btn popup__btn_position_card"
            onClick={this.props.onClose}
            type="reset"
          >
            <img className="popup__icon" src={closeIcon} alt="иконка крестик" />
          </button>
          <img
            className="popup__img"
            src={this.props.card ? this.props.card.link : "#"}
            alt={this.props.card ? this.props.card.name : ""}
          />
          <p className="popup__figcaption">
            {this.props.card ? this.props.card.name : ""}
          </p>
        </div>
      </section>
    );
  }
}

export default ImagePopup;
