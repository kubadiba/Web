import React from 'react';
import './Tile.css';

function Tile({ title, image, description }) {
    return (
        <div className="tile">
            <img src={image} alt={title} className="tile-image" />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default Tile;
