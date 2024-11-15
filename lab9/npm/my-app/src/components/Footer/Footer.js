import React from 'react';
import './Footer.css';
import logoImage from '../../images/book_logo.png';
import facebookIcon from '../../images/facebook.png';
import twitterIcon from '../../images/twitter.png';
import instagramIcon from '../../images/instagram.png';


function Footer() {
    return (
        <footer className="footer">
            <div className="branding">
                <img src={logoImage} alt="Logo" className="footer-logo" />
                <p>BookShop</p>
            </div>
            <div className="social-media">
                <a href="#facebook">
                    <img src={facebookIcon} alt="Facebook" className="social-icon" />
                </a>
                <a href="#twitter">
                    <img src={twitterIcon} alt="Twitter" className="social-icon" />
                </a>
                <a href="#instagram">
                    <img src={instagramIcon} alt="Instagram" className="social-icon" />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
