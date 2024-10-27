document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    let books = JSON.parse(localStorage.getItem('books')) || [];
    const bookToEdit = books.find(book => book.id === bookId);

    if (bookToEdit) {
        document.getElementById('bookName').value = bookToEdit.title;
        document.getElementById('description').value = bookToEdit.description;
        document.getElementById('pageCount').value = bookToEdit.pageCount;
        document.getElementById('genre').value = bookToEdit.type;
    }

    const editBookForm = document.getElementById('editBookForm');
    editBookForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const updatedBook = {
            id: bookId,
            title: document.getElementById('bookName').value,
            description: document.getElementById('description').value,
            pageCount: document.getElementById('pageCount').value,
            type: document.getElementById('genre').value
        };

        if (validateForm(updatedBook)) {
            books = books.map(book => (book.id === bookId ? updatedBook : book));
            localStorage.setItem('books', JSON.stringify(books));
            window.location.href = 'index.html';

        }
    });

    function validateForm({ title, description, pageCount, type }) {
        if (title.length < 3 || title.length > 30) {
            alert('Book name should be between 3 and 30 characters.');
            return false;
        }

        if (description.length < 10) {
            alert('Description should be at least 10 characters long.');
            return false;
        }

        if (pageCount <= 0) {
            alert('Pages must be a positive number greater than 0.');
            return false;
        }

        if (!type) {
            alert('Please select a book type.');
            return false;
        }

        return true;
    }
});