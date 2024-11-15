import React, { useContext } from 'react';
import './ProductDetailPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { CatalogContext } from '../Context/CatalogContext';

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { catalogItems } = useContext(CatalogContext);
    const product = catalogItems.find((prod) => prod.id === id);

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail">
                <img src={product.image} alt={product.title} />
                <div className="product-detail-content">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p> {/* Повний опис */}
                    <p><strong>Author:</strong> {product.author}</p>
                    <p><strong>Genre:</strong> {product.genre}</p>
                    <p className="price"><strong>Price:</strong> {product.price}</p>
                    <div className="button-group">
                        <button className="go-back" onClick={() => navigate(-1)}>Go back</button>
                        <button className="add-to-cart">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
