import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

class EditPopupProfile extends React.Component{
    static contextType = CurrentUserContext;
    constructor(props){
        super(props);
        this.state ={
            name: '',
            description: ''
        }
    }

    componentDidMount(){
       this.setState({
        name: this.context.name,
        description: this.context.about
       })
       console.log(this.context)
    }

    handleChangeName = (e) =>{
        this.setState({ 
            name: e.target.value
        })
    }

    handleChangeAbout =(e) =>{
        this.setState({
            description: e.target.value
        })
    }

    render(){
        return (
                <PopupWithForm title="Редактировать профиль" 
                onClose={this.props.onClose} 
                name="edit" 
                isOpen={this.props.isOpen}
                nameButton="Сохранить"
                children={ 
                        <fieldset className="popup__inputs-container">
                            <input className="popup__input popup__input_name_name" type="text" required placeholder="Имя" id="name"
                                name="name" maxLength="40" minLength="2" value={this.state.name} onChange={this.handleChangeName}/>
                            <span id="name-error" className="error error_name_name"></span>
                            <input className="popup__input popup__input_name_info" type="text" required placeholder="О себе"
                                id="info" name="info" maxLength="200" minLength="2" value={this.state.description} onChange={this.handleChangeAbout}/>
                            <span id="info-error" className="error error_name_info"></span>
                        </fieldset>} 
            />
        )
    }
}

export default EditPopupProfile;