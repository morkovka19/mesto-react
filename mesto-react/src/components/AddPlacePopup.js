import React from 'react';
import PopupWithForm from './PopupWithForm';

class AddPlacePopup extends React.Component{
    constructor(props){
        super(props);
        this.nameCardRef =  React.createRef();
        this.linkCardRef = React.createRef();
    }

    handleSubmit = (e)  =>{
        e.preventDefault();
        this.props.onAddPlace({
            nameNew: this.nameCardRef.current.value,
            linkNew: this.linkCardRef.current.value
        })
    }

    render(){
        return (
            <PopupWithForm title="Новое место" 
                        onClose={this.props.onClose} 
                        name="new-card" 
                        nameButton="Создать" 
                        isOpen={this.props.isOpen} 
                        onSubmit={this.handleSubmit}
                        children={
                                <fieldset className="popup__inputs-container">
                                    <input ref={this.nameCardRef} className="popup__input popup__input_name_name" maxLength="30" minLength="2" type="text" required placeholder="Название"
                                        id="name-img" name="name-img" />
                                        <span id="name-img-error" className="error error_name_name"></span>
                                    <input ref={this.linkCardRef} className="popup__input popup__input_name_info" type="url" required
                                        placeholder="Ссылка на картинку" id="href" name="info-img" />
                                    <span id="info-img-error" className="error error_name_info"></span>
                                </fieldset>}
                    />
        )
    }
}

export default AddPlacePopup;