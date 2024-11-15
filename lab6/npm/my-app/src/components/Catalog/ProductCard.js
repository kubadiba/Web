// ProductCard.js
import React from 'react';
import './ProductCart.css';

const ProductCard = ({ id, image, title, description, price }) => {
    return (
        <div className="product-card">
            <h2>Item {id}</h2>
            <div className="product-image-placeholder">
                <img src={image} alt={title} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p className="price">Price: {price}</p>
            <button className="view-more">View more</button>
        </div>
    );  
};

export default ProductCard;
