import { clearInputs, getInputValues } from './dom_until.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addBookForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValues = getInputValues();
    const { title, description, pageCount, type } = inputValues;

    // Перевірка наявності даних
    if (!title || !description || !pageCount || !type) {
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.innerHTML = "Всі поля повинні бути заповнені.";
      errorMessage.style.display = 'block';
      console.error('Заповніть усі поля форми перед відправкою.');
      return;
    }

    console.log('Дані для відправки:', inputValues);

    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        pageCount: Number(pageCount),
        type
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Помилка мережі: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Книга успішно додана:', data);
      clearInputs();
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Помилка при додаванні книги:', error);
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.innerHTML = "Помилка додавання книги.";
      errorMessage.style.display = 'block';
    });
  });
});
