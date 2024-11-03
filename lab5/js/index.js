import { addItemToPage } from './dom_until.js';

document.addEventListener('DOMContentLoaded', function () {
    const bookList = document.getElementById('bookList');
    const countExpensesButton = document.getElementById('countExpenses');
    const totalExpensesElement = document.getElementById('total_pages');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('search_book');
    const clearButton = document.getElementById('clearButton');
    const sortToggle = document.getElementById('sort_book');

    let books = [];
    let filteredBooks = [];
    let currentSearchQuery = ''; // змінна для збереження пошукового запиту

    // Функція для відображення книг
    const renderBooks = (booksToRender) => {
        bookList.innerHTML = '';
        booksToRender.forEach(book => addItemToPage(book));
    };

    // Функція для отримання книг з врахуванням сортування і пошуку
    const fetchBooks = (sortOrder = '', searchQuery = '') => {
        let url = 'http://localhost:3000/books';
        const params = new URLSearchParams();

        if (sortOrder) params.append('sort', sortOrder);
        if (searchQuery) params.append('search', searchQuery);

        if (params.toString()) url += `?${params.toString()}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                books = data;
                filteredBooks = [...books];
                renderBooks(filteredBooks);
            })
            .catch(error => console.error('Error fetching books:', error));
    };

    // Ініціалізувати список книг при завантаженні сторінки
    fetchBooks();

    // Обробник для підрахунку загальної кількості сторінок
    countExpensesButton.addEventListener('click', () => {
        fetch('http://localhost:3000/books')
            .then(response => response.json())
            .then(data => {
                const total = data.reduce((sum, book) => sum + parseFloat(book.pageCount), 0);
                totalExpensesElement.textContent = `${total}`;
            })
            .catch(error => console.error('Error calculating total pages:', error));
    });

    // Обробник для пошуку
    searchButton.addEventListener('click', () => {
        currentSearchQuery = searchInput.value.toLowerCase().trim();
        fetchBooks(sortToggle.checked ? 'desc' : 'asc', currentSearchQuery);
    });

    // Обробник для скидання пошуку
    clearButton.addEventListener('click', () => {
        currentSearchQuery = '';
        fetchBooks();
        searchInput.value = '';
    });

    // Обробник для сортування, який враховує поточний пошуковий запит
    sortToggle.addEventListener('change', () => {
        const sortOrder = sortToggle.checked ? 'desc' : 'asc';
        fetchBooks(sortOrder, currentSearchQuery);
    });

    // Функція для видалення книги
    const deleteBook = (bookId) => {
        fetch(`http://localhost:3000/books/${bookId}`, {
            method: 'DELETE'
        })
            .then(() => {
                books = books.filter(book => book.id !== bookId);
                filteredBooks = [...books];
                renderBooks(filteredBooks);
            })
            .catch(error => console.error('Error deleting book:', error));
    };

    // Обробник для видалення книги
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const bookId = event.target.getAttribute('data-id');
            deleteBook(bookId);
        }
    });
});
