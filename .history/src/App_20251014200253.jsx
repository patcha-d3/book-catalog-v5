// App.jsx
import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal.jsx";
import AddBook from "./components/AddBook.jsx";
import Book from "./book.jsx";

function App() {
  // เริ่มต้นไม่มีหนังสือ
  const [books, setBooks] = useState([]);

  // toggle การเลือก (เลือกได้ทีละเล่ม)
  const toggleSelect = (isbn13) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.isbn13 === isbn13
          ? { ...book, selected: !book.selected }
          : { ...book, selected: false }
      )
    );
  };

  // 🟢 เพิ่มหนังสือใหม่
  const handleAddBook = (newBook) => {
    const withDefaults = {
      ...newBook,
      isbn13: crypto.randomUUID(),
      selected: false,
      image: newBook.image || "https://via.placeholder.com/150x200?text=Book",
      price: newBook.price || "$0.00",
      url: newBook.url || "#",
    };
    setBooks((prev) => [...prev, withDefaults]);
  };

  // 🔴 ลบหนังสือที่เลือก
  const handleDeleteBook = () => {
    const selectedBook = books.find((b) => b.selected);
    if (!selectedBook) {
      alert("Please select a book to delete.");
      return;
    }
    setBooks((prev) => prev.filter((b) => b.isbn13 !== selectedBook.isbn13));
  };

  // 🟠 Update placeholder
  const handleUpdateBook = () => {
    const selectedBook = books.find((b) => b.selected);
    if (!selectedBook) {
      alert("Please select a book to update.");
      return;
    }
    alert("Update feature coming soon!");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Catalog v4</h1>
      </header>

      <main className="content">
        {/* --- ด้านซ้าย: Add / Update / Delete --- */}
        <div className="content-add">
          {/* ปุ่ม Add + modal */}
          <Modal btnLabel="Add" btnClassName="button-add">
            <AddBook onAdd={handleAddBook} />
          </Modal>

          {/* ปุ่ม Update / Delete */}
          <div className="action-buttons">
            <button className="button-update" onClick={handleUpdateBook}>
              Update
            </button>
            <button className="button-delete" onClick={handleDeleteBook}>
              Delete
            </button>
          </div>
        </div>

        {/* --- ด้านขวา: แสดงหนังสือ --- */}
        <BookTile books={books} onSelect={toggleSelect} />
      </main>

      <footer className="footer">
        <p>© Pat Sricome, 2025</p>
      </footer>
    </div>
  );
}

// 🟣 Component แสดงหนังสือ
function BookTile({ books, onSelect }) {
  if (books.length === 0) {
    return (
      <div className="content-books">
        <p style={{ color: "gray" }}>No books added yet.</p>
      </div>
    );
  }

  return (
    <div className="content-books">
      {books.map((book) => (
        <Book
          key={book.isbn13}
          title={book.title}
          author={book.author}
          image={book.image}
          price={book.price}
          url={book.url}
          selected={book.selected}
          onSelect={() => onSelect(book.isbn13)}
        />
      ))}
    </div>
  );
}

export default App;
