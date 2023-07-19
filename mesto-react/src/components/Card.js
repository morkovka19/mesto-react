import React from 'react';

class Card extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <li className="elements__item" key={this.props.info._id}>
                <img className="elements__item-img" onClick={() =>{this.props.onCardClick(this.props.info)}} src={this.props.info.link} alt="фото"/>
                <button className="elements__trash" tupe="submit"></button>
                <div className="elements__item-block">
                    <h2 className="elements__item-title">{this.props.info.name}</h2>
                    <div className="elements__block-like">
                        <button type="button" className="elements__btn-like"></button>
                        <span className="elements__amount-likes"></span>
                    </div>
                </div>
            </li>
        )
    }
}

export default Card;