// views/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');
    const addBookForm = document.getElementById('add-book-form');

    // Function to fetch and display books
    const fetchBooks = async () => {
        try {
            const response = await fetch('/books');
            const data = await response.json();
            bookList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.title} by ${book.author} - $${book.price}`;
                bookList.appendChild(li);
            });
        } catch (err) {
            console.error('Error fetching books:', err);
        }
    };

    // Fetch books on page load
    fetchBooks();

    // Function to handle form submission
    addBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const price = document.getElementById('price').value;

        try {
            const response = await fetch('/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, author, price })
            });
            const data = await response.json();
            console.log('Book added:', data);
            fetchBooks(); // Fetch and display updated book list
            // Clear form fields after submission
            addBookForm.reset();
        } catch (err) {
            console.error('Error adding book:', err);
        }
    });
});
