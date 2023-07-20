import HeaderLogo from '../images/icon/Vector-min.svg';
import React from 'react';

class Header extends React.Component{
    render(){
        return (
            <header className="header root__container-center">'
                <img className="header__logo" src={HeaderLogo} alt="логотип место" />
            </header>
        )
    }
}

export default Header;