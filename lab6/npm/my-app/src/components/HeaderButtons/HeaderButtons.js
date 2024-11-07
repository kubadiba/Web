import React from 'react';
import './HeaderButtons.css';

function HeaderButtons() {
    return (
        <div className="header-buttons">
            <nav>
                <a href="#home">Home</a>
                <a href="#catalog">Catalog</a>
                <a href="#cart">Cart</a>
            </nav>
        </div>
    );
}

export default HeaderButtons;
