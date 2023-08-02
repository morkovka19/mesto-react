import Main from '../components/Main.js'
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react'; 
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditPopupProfile from './EditPopupProfile.js';



 class  App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: null,
            currentUser: {},
            cards: []
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

    componentDidMount(){
        Promise.all([
            api.getUserInfo(),
            api.getInitialsCard()
        ])
        .then(([userInfo, cards]) =>{
            this.setState({
                currentUser: userInfo,
                cards: cards,
            });
        }).catch(err => console.log(err));
    }

    setCardsState(cards){
        this.setState({
            cards: cards
        })
    }
    
    handleCardLike = (card) =>{
        const isLiked = card.info.likes.some(i => i._id === this.state.currentUser._id);
        api.changeLikeCardStatus(card.info._id, isLiked).then((newCard) =>{
            const newCardArr = this.state.cards.map(c => c._id === card.info._id ? newCard : c);
            this.setCardsState(newCardArr);
        })
    }

    handleCardDelete = (card) =>{
        api.deleteCard(card.info._id).then((removeCard) =>{
            const newCardArr = this.state.cards.filter(c => c._id !== card.info._id);
            this.setCardsState(newCardArr);
        })
    }

  render() {
    return (
            <CurrentUserContext.Provider value={this.state.currentUser}>
                <div className = 'page__content'>
                    <Header />
                    <Main onAddPlace={this.handleAddPlaceClick} 
                        onCardClick={this.handleCardClick} 
                        onEditAvatar={this.handleEditAvatarClick} 
                        onEditProfile={this.handleEditProfileClick} 
                        onCardLike={this.handleCardLike}
                        cards={this.state.cards}
                        onCardDelete={this.handleCardDelete}
                        />
                    <Footer />
                   <EditPopupProfile  isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups}/>
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
            </CurrentUserContext.Provider>
        );
    }
}

export default App;
