// Header.js
import React from 'react';
import './Header.css';
import logoImage from '../../images/book_logo.png'; 
import HeaderButtons from '../HeaderButtons/HeaderButtons'; 

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logoImage} alt="Logo" className="header-logo" />
                <p className="logo-text">BookShop</p>
            </div>
            <HeaderButtons /> 
        </header>
    );
}

export default Header;
