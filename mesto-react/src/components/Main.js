import React from 'react';
import profileIconPen from '../images/icon/pen.svg';
import profileIcon from '../images/icon/Edit-Button-min.svg';
import plus from '../images/icon/plus.svg';
import api from '../utils/api.js';
import Card from '../components/Card.js';

class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userName: '',
            userDescription: '',
            userAvatar: '',
            cards: []
        }
    }

    componentDidMount(){
        Promise.all([
            api.getUserInfo(),
            api.getInitialsCard()
        ])
        .then(([userInfo, cards]) =>{
            this.setState({
                userName: userInfo.name,
                userDescription: userInfo.about,
                userAvatar: userInfo.avatar,
                cards: cards
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        return (
            <main className="main">
                <section className="profile root__container-center">
                    <div className="profile__block-author">
                        <img className="profile__avatar" src={this.state.userAvatar} alt="фото автора" />
                        <div className="profile__block-pen" onClick={this.props.onEditAvatar}><img className="profile__icon-pen" src={profileIconPen} alt='иконка редактирования аватара' /></div>
                        <div className="profile__block-info">
                            <div className="profile__block-title">
                                <h1 className="profile__title">{this.state.userName}</h1>
                                <button type="button" className="profile__btn-redaction" onClick={this.props.onEditProfile}><img className="profile__icon"
                                        src={profileIcon} alt="иконка для редактирования" /></button>
                            </div>
                            <p className="profile__subtitle">{this.state.userDescription}</p>
                        </div>
                    </div>
                    <button className="profile__btn" type="button" onClick={this.props.onAddPlace}><img className="profile__btn-icon" alt="плюс на кнопке добавить"
                            src={plus} /></button>
                </section>
                <section className="elements root__container-center">
                    <ul className="elements__group">
                        {this.state.cards.map((card, i) => (
                            <li className="elements__item" key={card._id}>
                                <Card info={card} onCardClick={this.props.onCardClick} />
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            )
    }

}

export default Main;