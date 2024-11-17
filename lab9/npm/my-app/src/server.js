const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3002;

// Статична папка для зображень
const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));

// Дані каталогу
const fallbackData = [
    {
        id: '1',
        title: "Mystery of the Lost City",
        description: "Explore the ancient ruins of a forgotten city. This mystery novel takes readers on an adventurous journey full of secrets and surprises.",
        author: "Agatha Christie",
        genre: "Detective",
        price: "$45.00",
        image: "/images/image4.png",
    },
    {  
        id: '2',
        title: "Beyond the Stars",
        description: "Venture beyond the known universe in this science fiction epic.",
        author: "Frank Herbert",
        genre: "Science",
        price: "$50.00",
        image: "/images/image5.png",
    },
    {
        id: '3',
        title: "Whispers of the Past",
        description: "Dive into a world of history and mystery.",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: "$40.00",
        image: "/images/image6.png",
    },
];

// Middleware
app.use(cors());
app.use(express.json());

// Утиліта для фільтрації
const filterCatalog = (data, filters) => {
    const { search, author, genre } = filters;

    return data.filter(item => {
        const matchesAuthor = author && author !== 'All' ? item.author === author : true;
        const matchesGenre = genre && genre !== 'All' ? item.genre === genre : true;
        const matchesSearch = search
            ? item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
            : true;

        return matchesAuthor && matchesGenre && matchesSearch;
    });
};

// Роут для отримання каталогу
app.get('/catalog', (req, res) => {
    try {
        const filters = req.query;
        const filteredItems = filterCatalog(fallbackData, filters);
        res.json(filteredItems);
    } catch (error) {
        console.error('Error fetching catalog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Роут для отримання товару за ID
app.get('/catalog/:id', (req, res) => {
    try {
        const { id } = req.params;
        const product = fallbackData.find(item => item.id === id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
