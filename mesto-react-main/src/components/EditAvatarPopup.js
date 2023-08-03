import React from "react";
import PopupWithForm from "./PopupWithForm";

class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.avatarRef = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateAvatar(this.avatarRef.current.value);
  };

  render() {
    return (
      <PopupWithForm
        title="Обновить аватар"
        onClose={this.props.onClose}
        nameButton="Сохранить"
        name="edit-avatar"
        isOpen={this.props.isOpen}
      >
        <fieldset className="popup__inputs-container">
          <input
            ref={this.avatarRef}
            className="popup__input popup__input_name_info"
            type="url"
            required
            placeholder="Ссылка на картинку"
            id="href-img"
            name="info-img-link"
          />
          <span
            id="info-img-error-avatar"
            className="error error_name_info"
          ></span>
        </fieldset>
      </PopupWithForm>
    );
  }
}

export default EditAvatarPopup;
