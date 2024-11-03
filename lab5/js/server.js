const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let books = [];

// Додавання нової книги
app.post('/books', (req, res) => {
    const { title, description, pageCount, type } = req.body;
    
    if (!title || !description || !pageCount || !type) {
        return res.status(400).json({ error: 'Всі поля повинні бути заповнені.' });
    }

    const newBook = { id: Date.now().toString(), title, description, pageCount, type };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Отримання книг з підтримкою пошуку та сортування
app.get('/books', (req, res) => {
    const { sort, search } = req.query;

    // Копіюємо масив книг для фільтрації та сортування
    let filteredBooks = [...books];

    // Фільтруємо книги, якщо передано пошуковий запит
    if (search) {
        const lowerCaseSearch = search.toLowerCase();
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(lowerCaseSearch) ||
            book.description.toLowerCase().includes(lowerCaseSearch)
        );
    }

    // Сортуємо книги, якщо передано параметр сортування
    if (sort === 'asc') {
        filteredBooks.sort((a, b) => a.pageCount - b.pageCount);
    } else if (sort === 'desc') {
        filteredBooks.sort((a, b) => b.pageCount - a.pageCount);
    }

    // Повертаємо відфільтровані та відсортовані результати
    res.json(filteredBooks);
});

// Оновлення книги за ID
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    
    let bookFound = false;
    books = books.map(book => {
        if (book.id === bookId) {
            bookFound = true;
            return { ...book, ...updatedBook };
        }
        return book;
    });
    
    if (!bookFound) {
        return res.status(404).json({ error: 'Книга не знайдена' });
    }
    
    res.json(updatedBook);
});

// Видалення книги за ID
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const initialLength = books.length;
    books = books.filter(book => book.id !== bookId);

    if (initialLength === books.length) {
        return res.status(404).json({ error: 'Книга не знайдена для видалення' });
    }

    res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
