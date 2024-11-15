import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import Catalog from './components/Catalog/Catalog';
import ProductDetailPage from './components/Catalog/Product/ProductDetailPage';

// Створення маршрутизатора за допомогою createBrowserRouter
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainContent />,
    },
    {
        path: '/catalog',
        element: <Catalog />,
    },
    {
        path: '/product/:id',
        element: <ProductDetailPage />,
    },
]);

function App() {
    return (
        <RouterProvider
            router={router} // Передаємо маршрутизатор
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
                v7_fetcherPersist: true,
                v7_normalizeFormMethod: true,
                v7_partialHydration: true,
                v7_skipActionErrorRevalidation: true
            }} // Включаємо всі прапорці для тестування нових можливостей v7
        >
            <div className="App">
                <Header />
                {/* Контент буде рендеритись в залежності від маршруту */}
                <Footer />
            </div>
        </RouterProvider>
    );
}

export default App;
