import React, { createContext, useState, useEffect } from 'react';
import { getCatalogItems } from '../../../api/apiService';

export const CatalogContext = createContext();

const CatalogProvider = ({ children }) => {
    const [catalogItems, setCatalogItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        author: 'All',
        genre: 'All',
        searchQuery: '',
    });

    useEffect(() => {
        const fetchCatalogItems = async () => {
            try {
                setIsLoading(true);
                const data = await getCatalogItems({});
                setCatalogItems(data);
                setFilteredItems(data);
            } catch (error) {
                console.error('Error loading catalog items:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCatalogItems();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const { author, genre, searchQuery } = filters;
            let filtered = catalogItems;

            if (author !== 'All') {
                filtered = filtered.filter((item) => item.author === author);
            }

            if (genre !== 'All') {
                filtered = filtered.filter((item) => item.genre === genre);
            }

            if (searchQuery) {
                filtered = filtered.filter((item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            setFilteredItems(filtered);
        };

        applyFilters();
    }, [filters, catalogItems]);

    const updateFilters = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };

    return (
        <CatalogContext.Provider value={{ filteredItems, isLoading, updateFilters }}>
            {children}
        </CatalogContext.Provider>
    );
};

export default CatalogProvider;
