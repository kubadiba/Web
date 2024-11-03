const titleInput = document.getElementById('bookName');
const descriptionInput = document.getElementById('description');
const pageCountInput = document.getElementById('pageCount');
const typeInput = document.getElementById('genre');

const bookList = document.getElementById('bookList');

const itemTemplate = ({ id, title, description, pageCount, type }) => `
<li id="${id}" class="card mb-3 item-card">
    <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">Description: ${description}</p>
        <p class="card-text">Pages: ${pageCount}</p>
        <p class="card-text">Type: ${type}</p>
    </div>
    <div class="card-buttons">
        <a href="edit_book.html?id=${id}" class="edit-btn">Edit</a>
        <button class="delete-btn" data-id="${id}">Delete</button>
    </div>
</li>`;

export const addItemToPage = ({ id, title, description, pageCount, type }) => {
    if (bookList) {
        bookList.insertAdjacentHTML('beforeend', itemTemplate({ id, title, description, pageCount, type }));
    } else {
        console.error('Book list element not found.');
    }
};

export const clearInputs = () => {
    if (titleInput && descriptionInput && pageCountInput && typeInput) {
        titleInput.value = '';
        descriptionInput.value = '';
        pageCountInput.value = '';
        typeInput.value = '';
    } else {
        console.log('Form inputs not found on this page.');
    }
};

export const getInputValues = () => {
    if (titleInput && descriptionInput && pageCountInput && typeInput) {
        return {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            pageCount: pageCountInput.value.trim(),
            type: typeInput.value
        };
    } else {
        console.log('Form inputs not found on this page.');
        return {};
    }
};
