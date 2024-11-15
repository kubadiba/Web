import React, { createContext, useState } from 'react';
import image1 from '../../../images/11111.webp';
import image2 from '../../../images/22.webp';
import image3 from '../../../images/333.webp';

export const CatalogContext = createContext();

const CatalogProvider = ({ children }) => {
    const [catalogItems] = useState([
        {
            id: '1',
            title: "Mystery of the Lost City",
            description: "Explore the ancient ruins of a forgotten city. This mystery novel takes readers on an adventurous journey full of secrets and surprises. Follow the protagonist as they uncover hidden treasures and dark truths buried in the past.",
            author: "Agatha Christie",
            genre: "Detective",
            price: "$45.00",
            image: image1
        },
        {
            id: '2',
            title: "Beyond the Stars",
            description: "Venture beyond the known universe in this science fiction epic that explores distant galaxies, futuristic technology, and the quest for knowledge. Perfect for fans of space operas and intergalactic adventures.",
            author: "Frank Herbert",
            genre: "Science",
            price: "$50.00",
            image: image2
        },
        {
            id: '3',
            title: "Whispers of the Past",
            description: "Dive into a world of history and mystery with 'Whispers of the Past.' This fantasy novel is set in a magical kingdom, where ancient legends come to life and characters face challenges that test their courage and resolve.",
            author: "J.K. Rowling",
            genre: "Fantasy",
            price: "$40.00",
            image: image3
        },
    ]);

    return (
        <CatalogContext.Provider value={{ catalogItems }}>
            {children}
        </CatalogContext.Provider>
    );
};

export default CatalogProvider;
