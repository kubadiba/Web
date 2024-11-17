import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CatalogProvider from './components/Catalog/Context/CatalogContext';
import Catalog from './components/Catalog/Catalog';
import ProductDetailPage from './components/Catalog/Product/ProductDetailPage';
import Home from './components/MainContent/MainContent';

function App() {
    return (
        <CatalogProvider>
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} /> {/* Головна сторінка */}
                        <Route path="/catalog" element={<Catalog />} /> {/* Каталог */}
                        <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Деталі товару */}
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </CatalogProvider>
    );
}

export default App;
