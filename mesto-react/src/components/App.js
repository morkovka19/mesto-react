import Main from '../components/Main.js'
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react'; 



 class  App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: null
        }
    }


    handleEditAvatarClick = () => {
        this.setState({isEditAvatarPopupOpen: true,});
    }

    handleEditProfileClick = () => {
        this.setState({isEditProfilePopupOpen: true,});
    }

    handleAddPlaceClick = () => {
        this.setState({isAddPlacePopupOpen: true,});
    }

    closeAllPopups = () =>{
        this.setState({isEditAvatarPopupOpen: false,
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            selectedCard: null
        })
    }

    handleCardClick = (card) =>{
        this.setState({selectedCard: card})
    }


  render() {
    return (
            <div className = 'page__content'>
                <Header />
                <Main onAddPlace={this.handleAddPlaceClick} 
                    onCardClick={this.handleCardClick} 
                    onEditAvatar={this.handleEditAvatarClick} 
                    onEditProfile={this.handleEditProfileClick} 
                    />
                <Footer />
                <PopupWithForm title="Редактировать профиль" 
                    onClose={this.closeAllPopups} 
                    name="edit" 
                    isOpen={this.state.isEditProfilePopupOpen}
                    nameButton="Сохранить"
                    children={ 
                            <fieldset className="popup__inputs-container">
                                <input className="popup__input popup__input_name_name" type="text" required placeholder="Имя" id="name"
                                    name="name" maxLength="40" minLength="2" />
                                <span id="name-error" className="error error_name_name"></span>
                                <input className="popup__input popup__input_name_info" type="text" required placeholder="О себе"
                                    id="info" name="info" maxLength="200" minLength="2" />
                                <span id="info-error" className="error error_name_info"></span>
                            </fieldset>} 
                />
                <PopupWithForm title="Новое место" 
                    onClose={this.closeAllPopups} 
                    name="new-card" 
                    nameButton="Создать" 
                    isOpen={this.state.isAddPlacePopupOpen} 
                    children={
                            <fieldset className="popup__inputs-container">
                                <input className="popup__input popup__input_name_name" maxLength="30" minLength="2" type="text" required placeholder="Название"
                                    id="name-img" name="name-img" />
                                    <span id="name-img-error" className="error error_name_name"></span>
                                <input className="popup__input popup__input_name_info" type="url" required
                                    placeholder="Ссылка на картинку" id="href" name="info-img" />
                                <span id="info-img-error" className="error error_name_info"></span>
                            </fieldset>}
                />
                <PopupWithForm title="Обновить аватар" 
                    onClose={this.closeAllPopups} 
                    nameButton="Сохранить" 
                    name="edit-avatar" 
                    isOpen={this.state.isEditAvatarPopupOpen} 
                    children={ 
                            <fieldset className="popup__inputs-container">
                                <input className="popup__input popup__input_name_info" type="url" required
                                    placeholder="Ссылка на картинку" id="href-img" name="info-img-link" />
                                <span id="info-img-error-avatar" className="error error_name_info"></span>
                            </fieldset>} 
                />

                <PopupWithForm title="Вы уверены?" 
                    onClose={this.closeAllPopups} 
                    name="delete-card" 
                    nameButton="Да" 
                />
                <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}/>
            </div>
        );
    }
}

export default App;
