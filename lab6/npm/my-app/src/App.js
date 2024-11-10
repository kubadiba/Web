import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';

import CatalogPage from './components/Catalog/CatalogPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/catalog" element={<CatalogPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
