import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../ProductCart/ProductCard';
import './Catalog.css';
import { SelectFilter } from './UI/Select';
import { fetchCatalogItems } from '../../api/apiService';  // Імпортуємо функцію для отримання даних

const Catalog = () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [priceRange, setPriceRange] = useState('All');

    // Функція для отримання даних з бекенду з useCallback
    const fetchProducts = useCallback(async () => {
        const filters = { search: searchQuery, category, priceRange };
        try {
            setIsLoading(true);
            const data = await fetchCatalogItems(filters);
            setFilteredItems(data); // Оновлюємо стани з отриманими даними
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, category, priceRange]);  // Залежності: при зміні фільтрів викликаємо fetchProducts

    // Викликаємо fetchProducts при зміні фільтрів
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);  // Додаємо fetchProducts в залежності, щоб уникнути попередження ESLint

    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handlePriceRangeChange = (e) => setPriceRange(e.target.value);
    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleApplyFilters = () => {
        fetchProducts(); // Викликаємо fetchProducts при натисканні кнопки Apply
    };

    return (
        <main className="catalog">
            <header className="catalog-header">
                <div className="search-bar-group">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className="filters">
                    <div className="filter-container">
                        <SelectFilter
                            onChange={handleCategoryChange}
                            options={[
                                { value: 'All', label: 'All Categories' },
                                { value: 'Accessories', label: 'Accessories' },
                                { value: 'Toys', label: 'Toys' },
                            ]}
                        />
                    </div>
                    <div className="filter-container">
                        <SelectFilter
                            onChange={handlePriceRangeChange}
                            options={[
                                { value: 'All', label: 'All Price Ranges' },
                                { value: 'Low', label: 'Low' },
                                { value: 'Medium', label: 'Medium' },
                                { value: 'High', label: 'High' },
                            ]}
                        />
                    </div>
                    <button className="apply-button" onClick={handleApplyFilters}>
                        Apply
                    </button>
                </div>
            </header>

            <section className="catalog-grid">
                {isLoading ? (
                    <div className="spinner">Loading...</div>
                ) : (
                    filteredItems.map((item) => (
                        <ProductCard key={item.id} {...item} />
                    ))
                )}
            </section>
        </main>
    );
};

export default Catalog;
