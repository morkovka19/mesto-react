import React from 'react';
import CloseIcon from '../images/icon/close-icon-min.svg';

class PopupWithForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <section className={`popup popup_type_${this.props.name} ${this.props.isOpen && 'popup_opened'}`} id={`popup-${this.name}`}>
            <div className="popup__container">
                <button className="popup__btn" onClick={this.props.onClose} type="reset"><img className="popup__icon" src={CloseIcon}
                        alt="иконка крестик" /></button>
                <h2 className="popup__title">{this.props.title}</h2>
                <form className="popup__form" name={this.props.name} noValidate>
                    {this.props.children}
                    <button className="popup__submit" type="submit" value="Сохранить">{this.props.nameButton}</button>
                </form>
            </div>
        </section>
        )
    }
}

export default PopupWithForm;