const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3002; // Ensure the port doesn’t conflict with the frontend (adjust if needed)

// Define images path
const imagesPath = path.join(__dirname, 'images');

// Check if images directory exists
if (!fs.existsSync(imagesPath)) {
    console.error(`Error: Images directory not found at ${imagesPath}`);
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the images directory
app.use('/images', express.static(imagesPath));

// Fallback data
const fallbackData = [
    {
        id: '1',
        title: "Mystery of the Lost City",
        description: "Explore the ancient ruins of a forgotten city. This mystery novel takes readers on an adventurous journey full of secrets and surprises.",
        author: "Agatha Christie",
        genre: "Detective",
        price: "$45.00",
        image: "./images/image4.png", // Правильний шлях до зображення
    },
    {
        id: '2',
        title: "Beyond the Stars",
        description: "Venture beyond the known universe in this science fiction epic.",
        author: "Frank Herbert",
        genre: "Science",
        price: "$50.00",
        image: "/images/image5.png", // Правильний шлях до зображення
    },
    {
        id: '3',
        title: "Whispers of the Past",
        description: "Dive into a world of history and mystery.",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: "$40.00",
        image: "/images/image6.png", // Правильний шлях до зображення
    },
];

// Endpoint to fetch catalog items with optional filters
app.get('/catalog', (req, res) => {
    const { category, priceRange, search } = req.query;
    let filteredItems = [...fallbackData];

    // Apply filters
    if (category && category !== 'All') {
        filteredItems = filteredItems.filter(item => item.genre === category);
    }
    if (priceRange && priceRange !== 'All') {
        filteredItems = filteredItems.filter(item => {
            if (priceRange === 'Low') return parseFloat(item.price.slice(1)) < 50;
            if (priceRange === 'Medium') return parseFloat(item.price.slice(1)) >= 50 && parseFloat(item.price.slice(1)) < 100;
            if (priceRange === 'High') return parseFloat(item.price.slice(1)) >= 100;
            return true;
        });
    }
    if (search) {
        filteredItems = filteredItems.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.json(filteredItems);
});

// Endpoint to fetch a single product by ID
app.get('/catalog/:id', (req, res) => {
    const itemId = req.params.id;
    const product = fallbackData.find(item => item.id === itemId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
    }
});
