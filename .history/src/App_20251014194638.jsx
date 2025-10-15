// App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import data from "../data/books.json";
import Modal from "./components/Modal.jsx";
import AddBook from "./components/AddBook.jsx";

function App() {
  const [books, setBooks] = useState(data);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // ✅ Toggle select book (only one at a time)
  const toggleSelect = (isbn13) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.isbn13 === isbn13
          ? { ...book, selected: !book.selected }
          : { ...book, selected: false }
      )
    );
  };

  // ✅ Delete selected book
  const handleDeleteBook = () => {
    const selectedBook = books.find((book) => book.selected);
    if (!selectedBook) {
      alert("Please select a book to delete.");
      return;
    }
    setBooks((prev) =>
      prev.filter((book) => book.isbn13 !== selectedBook.isbn13)
    );
  };

  // ✅ Placeholder for Update button
  const handleUpdateBook = () => {
    const selectedBook = books.find((book) => book.selected);
    if (!selectedBook) {
      alert("Please select a book to update.");
      return;
    }
    alert("Update feature coming soon!");
  };

  // ✅ Add new book (from AddBook component)
  const handleAddBook = (newBook) => {
    const bookWithSelected = { ...newBook, selected: false };
    setBooks((prev) => [...prev, bookWithSelected]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Catalog v4</h1>
      </header>

      <main className="content">
        <div className="content-add">
          {/* ✅ Add button using modal */}
          <Modal btnLabel="Add" btnClassName="button-add">
            <AddBook onAdd={handleAddBook} />
          </Modal>

          {/* ✅ Update & Delete buttons */}
          <div className="action-buttons">
            <button className="button-update" onClick={handleUpdateBook}>
              Update
            </button>
            <button className="button-delete" onClick={handleDeleteBook}>
              Delete
            </button>
          </div>
        </div>

        {/* ✅ Display books (selectable, no x button) */}
        <BookTile books={books} onSelect={toggleSelect} />
      </main>

      <footer className="footer">
        <p>© Pat Sricome, 2025</p>
      </footer>
    </div>
  );
}

// ✅ BookTile now supports "selected" click toggle and removes delete button
function BookTile({ books, onSelect }) {
  return (
    <div className="content-books">
      {books.map((book) => (
        <div
          key={book.isbn13}
          className={`card-book ${book.selected ? "selected" : ""}`}
          onClick={() => onSelect(book.isbn13)}
        >
          <div className="card-book-image">
            <img src={book.image} alt="book" />
          </div>
          <div className="card-book-body">
            <p className="card-book-price">{book.price}</p>
            <a
              href={book.url}
              target="_blank"
              rel="noreferrer"
              className="link-button"
            >
              Buy now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
