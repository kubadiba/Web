import axios from 'axios';
import { response } from 'express';

const API_BASE_URL = 'http://localhost:3002';

export const getCatalogItems = async (filters = {}) => {
    const queryParams = new URLSearchParams(
        Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => value !== 'All' && value !== undefined)
        )
    ).toString();

    const response = await axios.get(`${API_BASE_URL}/catalog?${queryParams}`);
    return response.data; 
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/catalog/${id}`);
    return response.data;
};

