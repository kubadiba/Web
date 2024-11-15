import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCart.css';

const ProductCard = ({ id, image, title, description, author, genre }) => {
    const navigate = useNavigate();
    const truncatedDescription = description.length > 100 
        ? description.slice(0, 100) + '...' 
        : description;  // Скорочений опис

    return (
        <div className="product-card">
            <h2>Item {id}</h2>
            <div className="product-image-placeholder">
                <img src={image} alt={title} />
            </div>
            <h3>{title}</h3>
            <p>{truncatedDescription}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Genre:</strong> {genre}</p>
            <button className="view-more" onClick={() => navigate(`/product/${id}`)}>
                View more
            </button>
        </div>
    );
};

export default ProductCard;
