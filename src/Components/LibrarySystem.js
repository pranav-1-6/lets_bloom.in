import React, { useState, useEffect } from 'react';

const LibrarySystem = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');

  useEffect(() => {
    displayBooks();
  }, []);

  const addBook = () => {
    if (!title || !author || !publishedDate) {
      alert('Please fill in all fields');
      return;
    }

    const book = { title, author, publishedDate };

    // Retrieve existing books from localStorage or initialize an empty array
    const existingBooks = JSON.parse(localStorage.getItem('books')) || [];

    // Check for duplicate entry
    const isDuplicate = existingBooks.some(existingBook => existingBook.title === title);
    if (isDuplicate) {
      alert('Book already exists');
      return;
    }

    // Add the new book to the array
    existingBooks.push(book);

    // Save the updated array back to localStorage
    localStorage.setItem('books', JSON.stringify(existingBooks));

    // Clear the form
    setTitle('');
    setAuthor('');
    setPublishedDate('');

    // Update the book list
    displayBooks();
  };

  const displayBooks = () => {
    // Retrieve existing books from localStorage or initialize an empty array
    const existingBooks = JSON.parse(localStorage.getItem('books')) || [];

    // Set the books state
    setBooks(existingBooks);
  };

  return (
    <div>
      <h1>Library System</h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="publishedDate">Published Date:</label>
        <input
          type="date"
          id="publishedDate"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          required
        />

        <button type="button" onClick={addBook}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default LibrarySystem;
