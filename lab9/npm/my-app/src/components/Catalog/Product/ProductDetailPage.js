import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css';
import { getProductById } from '../../../api/apiService';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail-page">
            <div className="product-detail">
                <img src={`http://localhost:3002${product.image}`} alt={product.title} />
                <div className="product-detail-content">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p><strong>Author:</strong> {product.author}</p>
                    <p><strong>Genre:</strong> {product.genre}</p>
                    <p className="price">Price: {product.price}</p>
                    <div className="button-group">
                        <button className="go-back" onClick={() => navigate(-1)}>
                            Go Back
                        </button>
                        <button className="add-to-cart">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
