document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    fetch(`http://localhost:3000/books/${bookId}`)
        .then(response => response.json())
        .then(bookToEdit => {
            document.getElementById('bookName').value = bookToEdit.title;
            document.getElementById('description').value = bookToEdit.description;
            document.getElementById('pageCount').value = bookToEdit.pageCount;
            document.getElementById('genre').value = bookToEdit.type;
        });

    const editBookForm = document.getElementById('editBookForm');
    editBookForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const updatedBook = {
            title: document.getElementById('bookName').value,
            description: document.getElementById('description').value,
            pageCount: document.getElementById('pageCount').value,
            type: document.getElementById('genre').value
        };

        fetch(`http://localhost:3000/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Book updated:', data);
                window.location.href = 'index.html';
            })
            .catch(error => console.error('Error updating book:', error));
    });
});
