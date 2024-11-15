import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Функція для отримання всіх товарів з фільтрацією
export const fetchCatalogItems = async (filters) => {
    try {
        const response = await axios.get(`${API_URL}/catalog`, { params: filters });
        return response.data; // Повертаємо дані товарів
    } catch (error) {
        console.error('Error fetching catalog items:', error);
        throw error;
    }
};

// Функція для отримання одного товару за ID
export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/catalog/${id}`);
        return response.data; // Повертаємо дані товару
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

// Додавання getAllItems, щоб використовувати старий імпорт
export const getAllItems = async () => {
    return await fetchCatalogItems({});
};
