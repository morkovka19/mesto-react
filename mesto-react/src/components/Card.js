import React from 'react';

class Card extends React.Component{
    constructor(props){
        super(props);
    }

    handleCardClick = () =>{
        this.props.onCardClick(this.props.info);
    }

    render(){
        return(
            <>
                <img className="elements__item-img" onClick={this.handleCardClick} src={this.props.info.link} alt={this.props.info.name}/>
                <button className="elements__trash" tupe="submit"></button>
                <div className="elements__item-block">
                    <h2 className="elements__item-title">{this.props.info.name}</h2>
                    <div className="elements__block-like">
                        <button type="button" className="elements__btn-like"></button>
                        <span className="elements__amount-likes">{this.props.info.likes.length}</span>
                    </div>
                </div>
            </>
        )
    }
}

export default Card;