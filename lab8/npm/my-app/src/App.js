// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import CatalogProvider from './components/Catalog/Context/CatalogContext'; // Імпортуємо CatalogProvider
import Catalog from './components/Catalog/Catalog';
import ProductDetailPage from './components/Catalog/Product/ProductDetailPage';

function App() {
    return (
        <CatalogProvider> {/* Надаємо контекст всьому додатку */}
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/catalog" element={<Catalog />} /> {/* Catalog більше не потребує products */}
                        <Route path="/product/:id" element={<ProductDetailPage />} /> {/* ProductDetailPage також більше не потребує products */}
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </CatalogProvider>
    );
}

export default App;
