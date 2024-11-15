import React, { createContext, useState, useEffect } from 'react';
import { getAllItems } from '../../../api/apiService'; // Запити до бекенду
import image1 from '../../../images/11111.webp';
import image2 from '../../../images/22.webp';
import image3 from '../../../images/333.webp';

export const CatalogContext = createContext();

// Локальні дані як запасні
const fallbackData = [
    {
        id: '1',
        title: "Mystery of the Lost City",
        description: "Explore the ancient ruins of a forgotten city. This mystery novel takes readers on an adventurous journey full of secrets and surprises.",
        author: "Agatha Christie",
        genre: "Detective",
        price: "$45.00",
        image: image1,
    },
    {
        id: '2',
        title: "Beyond the Stars",
        description: "Venture beyond the known universe in this science fiction epic.",
        author: "Frank Herbert",
        genre: "Science",
        price: "$50.00",
        image: image2,
    },
    {
        id: '3',
        title: "Whispers of the Past",
        description: "Dive into a world of history and mystery.",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: "$40.00",
        image: image3,
    },
];

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
                const response = await getAllItems();
                setCatalogItems(response.data);
                setFilteredItems(response.data); // Початковий стан фільтрованих даних
            } catch (error) {
                console.error('Помилка завантаження товарів:', error);
                setCatalogItems(fallbackData);
                setFilteredItems(fallbackData); // Використовуємо локальні дані
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
