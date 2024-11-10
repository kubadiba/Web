import React from 'react';

export function AuthorFilter() {
    return (
        <select>
            <option>Author</option>
            <option>George Orwell</option>
            <option>J.K. Rowling</option>
            <option>Frank Herbert</option>
            <option>Stephen King</option>
            <option>Agatha Christie</option>
        </select>
    );
}

export function PageCountFilter() {
    return (
        <select>
            <option>Page Count (Descending)</option>
            <option>More than 500 pages</option>
            <option>300-500 pages</option>
            <option>100-300 pages</option>
            <option>Less than 100 pages</option>
        </select>
    );
}

export function GenreFilter() {
    return (
        <select>
            <option>Genre</option>
            <option>Fantasy</option>
            <option>Detective</option>
            <option>Romance</option>
            <option>Science</option>
            <option>Self-help</option>
        </select>
    );
}
