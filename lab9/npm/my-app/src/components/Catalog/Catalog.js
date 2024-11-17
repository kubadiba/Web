import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCart/ProductCard';
import './Catalog.css';
import { SelectFilter } from './UI/Select';
import { getCatalogItems } from '../../api/apiService';

const Catalog = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [authorFilter, setAuthorFilter] = useState('All');
    const [genreFilter, setGenreFilter] = useState('All');

    useEffect(() => {
        const loadItems = async () => {
            setIsLoading(true);
            try {
                const data = await getCatalogItems({});
                setItems(data);
                setFilteredItems(data);
            } catch (error) {
                console.error('Error fetching catalog items:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadItems();
    }, []);

    const handleApplyFilters = async () => {
        setIsLoading(true);
        try {
            const filters = {
                search: searchQuery || undefined,
                author: authorFilter !== 'All' ? authorFilter : undefined,
                genre: genreFilter !== 'All' ? genreFilter : undefined,
            };
            const data = await getCatalogItems(filters);
            setFilteredItems(data);
        } catch (error) {
            console.error('Error applying filters:', error);
        } finally {
            setIsLoading(false);
        }
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="filters">
                    <SelectFilter
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        options={[
                            { value: 'All', label: 'All Authors' },
                            { value: 'George Orwell', label: 'George Orwell' },
                            { value: 'J.K. Rowling', label: 'J.K. Rowling' },
                            { value: 'Frank Herbert', label: 'Frank Herbert' },
                            { value: 'Stephen King', label: 'Stephen King' },
                            { value: 'Agatha Christie', label: 'Agatha Christie' },
                        ]}
                    />
                    <SelectFilter
                        value={genreFilter}
                        onChange={(e) => setGenreFilter(e.target.value)}
                        options={[
                            { value: 'All', label: 'All Genres' },
                            { value: 'Fantasy', label: 'Fantasy' },
                            { value: 'Detective', label: 'Detective' },
                            { value: 'Romance', label: 'Romance' },
                            { value: 'Science', label: 'Science' },
                            { value: 'Self-help', label: 'Self-help' },
                        ]}
                    />
                    <button className="apply-button" onClick={handleApplyFilters}>
                        Apply
                    </button>
                </div>
            </header>

            <section className="catalog-grid">
                {isLoading ? (
                    <div className="spinner">Loading...</div>
                ) : filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <ProductCard key={item.id} {...item} />
                    ))
                ) : (
                    <div className="no-items">No items found</div>
                )}
            </section>
        </main>
    );
};

export default Catalog;
