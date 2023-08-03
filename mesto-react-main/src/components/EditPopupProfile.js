import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

class EditPopupProfile extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      isChange: false,
    };
  }

  componentDidMount() {
    console.log(this.context.name);
    this.setState({
      name: this.context?.name,
      description: this.context?.about,
    });
  }

  handleChangeName = (e) => {
    this.setState({
      isChange: true,
      name: e.target.value,
    });
  };

  handleChangeAbout = (e) => {
    this.setState({
      isChange: true,
      description: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateUser({
      nameNew: this.state.name,
      aboutNew: this.state.description,
    });
    this.setState({
      isChange: false,
    });
  };

  componentDidUpdate() {
    if (
      !this.state.isChange &&
      (this.context.name != this.state.name ||
        this.context.about != this.state.description)
    ) {
      this.setState({
        name: this.context.name,
        description: this.context.about,
      });
    }
  }

  handleOnClose = () => {
    this.props.onClose();
    this.setState({
      isChange: false,
    });
  };

  render() {
    return (
      <PopupWithForm
        title="Редактировать профиль"
        onClose={this.handleOnClose}
        name="edit"
        isOpen={this.props.isOpen}
        nameButton="Сохранить"
        onSubmit={this.handleSubmit}
      >
        <fieldset className="popup__inputs-container">
          <input
            className="popup__input popup__input_name_name"
            type="text"
            required
            placeholder="Имя"
            id="name"
            name="name"
            maxLength="40"
            minLength="2"
            value={this.state.name || ""}
            onChange={this.handleChangeName}
          />
          <span id="name-error" className="error error_name_name"></span>
          <input
            className="popup__input popup__input_name_info"
            type="text"
            required
            placeholder="О себе"
            id="info"
            name="info"
            maxLength="200"
            minLength="2"
            value={this.state.description || ""}
            onChange={this.handleChangeAbout}
          />
          <span id="info-error" className="error error_name_info"></span>
        </fieldset>
      </PopupWithForm>
    );
  }
}

export default EditPopupProfile;
