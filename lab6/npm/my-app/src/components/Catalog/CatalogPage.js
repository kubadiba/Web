import React from 'react';
import './CatalogPage.css';
import image1 from '../../images/11111.webp';
import image2 from '../../images/22.webp';
import image3 from '../../images/333.webp';
import { AuthorFilter, PageCountFilter, GenreFilter } from './Filters';
import ProductCard from './ProductCard';

const products = [
    {
        id: 1,
        image: image1,
        title: "Mystery of the Lost City",
        description: "Embark on a thrilling adventure to uncover hidden secrets in an ancient city.",
        price: "$18.99"
    },
    {
        id: 2,
        image: image2,
        title: "Beyond the Stars",   
        description: "Discover a world beyond our galaxy in this gripping science fiction tale.",
        price: "$22.50"
    },
    {
        id: 3,
        image: image3,
        title: "Whispers of the Past",
        description: "A captivating journey through history that reveals untold stories from ancient times.",
        price: "$19.75"
    },
];

function CatalogPage() {
    return (
        <div className="catalog-page">
            <header className="catalog-header">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <span className="search-icon">🔍</span>
                </div>
                <div className="filters">
                    <AuthorFilter />
                    <PageCountFilter />
                    <GenreFilter />
                    <button className="apply-button">Apply</button>
                </div>
            </header>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        id={product.id} 
                        image={product.image} 
                        title={product.title} 
                        description={product.description} 
                        price={product.price} 
                    />
                ))}
            </div>
        </div>
    );
}

export default CatalogPage;
