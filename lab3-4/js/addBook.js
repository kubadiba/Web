import { clearInputs, getInputValues } from './dom_until.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addBookForm');
  let books = JSON.parse(localStorage.getItem('books')) || [];

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValues = getInputValues();
    const { title, description, pageCount, type } = inputValues;


    const isDuplicate = books.some(book => book.title.toLowerCase().trim() === title.toLowerCase().trim());

    if (isDuplicate) {
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.innerHTML = "Книга з такою назвою вже існує.";
      errorMessage.style.display = 'block';
    } else {
      const newBook = {
        id: uuid.v4(),
        title,
        description,
        pageCount,
        type
      };
      
      Object.freeze(newBook);
            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));
            clearInputs();
            window.location.href = 'index.html'; 
    }
  });
});
