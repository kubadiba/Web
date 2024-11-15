import React, { useState, useEffect } from 'react';
import './ProductDetailPage.css';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/catalog/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail-page">
            <div className="product-detail">
                <img src={product.image} alt={product.title} />
                <div className="product-detail-content">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p><strong>Author:</strong> {product.author}</p>
                    <p><strong>Genre:</strong> {product.genre}</p>
                    <p className="price"><strong>Price:</strong> {product.price}</p>
                    <div className="button-group">
                        <button className="go-back">Go back</button>
                        <button className="add-to-cart">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
