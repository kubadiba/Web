import { addItemToPage } from './dom_until.js';

document.addEventListener('DOMContentLoaded', function () {
    const bookList = document.getElementById('bookList');
    const countExpensesButton = document.getElementById('countExpenses');
    const totalExpensesElement = document.getElementById('total_pages');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('search_book');
    const clearButton = document.getElementById('clearButton');
    const sortToggle = document.getElementById('sort_book');

    if (!bookList) {
        console.error('Book list container not found!');
        return;
    }

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let filteredBooks = [...books];
    let unmodifiedFilteredBooks = [...books];

    const renderBooks = (booksToRender) => {
        bookList.innerHTML = '';
        booksToRender.forEach(book => addItemToPage(book));
    };

    renderBooks(filteredBooks);

    const calculateTotalExpenses = (booksArray) => {
        const totalExpenses = booksArray.reduce((sum, book) => sum + parseFloat(book.pageCount), 0);
        return totalExpenses;
    };

    countExpensesButton.addEventListener('click', () => {
        const total = calculateTotalExpenses(filteredBooks);
        totalExpensesElement.textContent = `${total.toFixed()}`;
    });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase().trim();
        filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
        unmodifiedFilteredBooks = [...filteredBooks];
        renderBooks(filteredBooks);
    });

    clearButton.addEventListener('click', () => {
        filteredBooks = [...books];
        unmodifiedFilteredBooks = [...books];
        renderBooks(filteredBooks);
        searchInput.value = '';
    });

    sortToggle.addEventListener('change', () => {
        if (sortToggle.checked) {
            filteredBooks.sort((a, b) => b.pageCount - a.pageCount);
        } else {
            filteredBooks = [...unmodifiedFilteredBooks];
        }
        renderBooks(filteredBooks);
    });

    const deleteBook = (bookId) => {
        if (!bookId) {
            console.error('Book ID is not provided.');
            return;
        }

        const bookIndex = books.findIndex(book => book.id === bookId);

        if (bookIndex !== -1) {
            books.splice(bookIndex, 1);

            localStorage.setItem('books', JSON.stringify(books));

            filteredBooks = [...books];
            unmodifiedFilteredBooks = [...books];

            renderBooks(filteredBooks);
        }
    };

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const bookId = event.target.getAttribute('data-id'); 
            deleteBook(bookId); 
        }
    });
});

const addBook = (newBook) => {
    const newBookTitle = newBook.title.toLowerCase().trim();

    const isDuplicate = books.some(book => book.title.toLowerCase().trim() === newBookTitle);

    if (isDuplicate) {
        console.error("Книга з такою назвою вже існує.");
        alert("Книга з такою назвою вже існує.");
        return;
    }

    books.push(newBook);
    filteredBooks = [...books]; 
    unmodifiedFilteredBooks = [...books];
    localStorage.setItem('books', JSON.stringify(books));

    renderBooks(filteredBooks);
};

addBook({
    title: 'New Book Title',
    pageCount: 300
});
