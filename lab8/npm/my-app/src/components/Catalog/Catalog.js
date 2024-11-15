import React, { useContext, useState } from 'react';
import ProductCard from '../ProductCart/ProductCard';
import { CatalogContext } from './Context/CatalogContext';
import { SelectFilter } from './UI/Select';
import './Catalog.css';

const Catalog = () => {
    const { catalogItems } = useContext(CatalogContext);
    const [authorFilter, setAuthorFilter] = useState('All');
    const [genreFilter, setGenreFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = catalogItems.filter(item => {
        const matchesAuthor = authorFilter === 'All' || item.author === authorFilter;
        const matchesGenre = genreFilter === 'All' || item.genre === genreFilter;
        const matchesSearchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesAuthor && matchesGenre && matchesSearchQuery;
    });

    return (
        <main className="catalog">
            <header className="catalog-header">
                <div className="search-bar-group">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                    <button className="apply-button" onClick={() => {}}>Apply</button>
                </div>
                <div className="filters">
                    <SelectFilter
                        label="Author"
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
                        label="Genre"
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
                </div>
            </header>
            <section className="catalog-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            author={item.author}
                            genre={item.genre}
                        />
                    ))
                ) : (
                    <p>No items match your criteria.</p>
                )}
            </section>
        </main>
    );
};

export default Catalog;
