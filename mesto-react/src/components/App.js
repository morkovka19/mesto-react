import Main from '../components/Main.js'
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react'; 
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditPopupProfile from './EditPopupProfile.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';


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


    handleUpdateUser = ({nameNew, aboutNew})=>{
        api.editProfile({nameNew, aboutNew}).then((userInfoNew) =>{
            this.setState({
                currentUser: userInfoNew,
                isEditProfilePopupOpen: false,
            })
        }).catch(err => console.log(err))
    }

    handleUpdateAvatar = (avatarNew) =>{
        api.editAvatar(avatarNew).then((newUser) =>{
            this.setState({
                currentUser: newUser,
                isEditAvatarPopupOpen: false
            })
        }).catch(err => console.log(err))
    }

    handleAddPlaceSubmit  = ({nameNew, linkNew}) =>{
        api.addNewCard({nameNew, linkNew}).then((newCard) =>{
            this.setCardsState([newCard, ...this.state.cards]);
            this.setState({
                isAddPlacePopupOpen: false
            })
        }).catch(err => console.log(err))
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
                    <EditPopupProfile onUpdateUser={this.handleUpdateUser} isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups}/>
                    <EditAvatarPopup onUpdateAvatar={this.handleUpdateAvatar} isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups}/>
                    <AddPlacePopup onAddPlace={this.handleAddPlaceSubmit} isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}/>
                    <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}/>
                    <PopupWithForm title="Вы уверены?" 
                        onClose={this.closeAllPopups} 
                        name="delete-card" 
                        nameButton="Да" 
                    />
                    
                </div>
            </CurrentUserContext.Provider>
        );
    }
}

export default App;
