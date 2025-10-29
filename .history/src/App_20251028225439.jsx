import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal.jsx";
import AddBook from "./components/AddBook.jsx";
import Book from "./book.jsx";
import BookFilter from "./BookFilter";

function App() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    author: "",
  });

  // เลือกได้ทีละเล่ม
  const toggleSelect = (isbn13) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.isbn13 === isbn13
          ? { ...book, selected: !book.selected }
          : { ...book, selected: false }
      )
    );
  };

  // เพิ่มหนังสือใหม่
  const handleAddBook = (newBook) => {
    const withDefaults = {
      ...newBook,
      // ถ้าบาง environment ไม่มี crypto.randomUUID ให้ใช้ fallback
      isbn13:
        (window.crypto && crypto.randomUUID && crypto.randomUUID()) ||
        String(Date.now()),
      selected: false,
      // ✅ รูปให้ดึงจาก newBook.url (ชื่อเดียวกับใน AddBook.jsx)
      image: newBook.url || "https://via.placeholder.com/150x200?text=Book",
      // ไม่ใช้ราคา/ลิงก์ buy แล้ว
      url: newBook.url || "#",
    };
    setBooks((prev) => [...prev, withDefaults]);
  };

  // ลบหนังสือที่เลือก
  const handleDeleteBook = () => {
    const selectedBook = books.find((b) => b.selected);
    if (!selectedBook) {
      alert("Please select a book to delete.");
      return;
    }
    setBooks((prev) => prev.filter((b) => b.isbn13 !== selectedBook.isbn13));
  };

  // Update = no-op (ตามบรีฟ)
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
        <div className="content-add">
          <Modal btnLabel="Add" btnClassName="button-add">
            <AddBook onAdd={handleAddBook} />
          </Modal>

          <div className="action-buttons">
            <button className="button-update" onClick={handleUpdateBook}>
              Edit
            </button>
            <button className="button-delete" onClick={handleDeleteBook}>
              Delete
            </button>
          </div>
        </div>

        <BookTile books={books} onSelect={toggleSelect} />
      </main>

      <footer className="footer">
        <p>© Pat Sricome, 2025</p>
      </footer>
    </div>
  );
}

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
          image={book.image} // ✅ ตอนนี้จะได้รูปจาก URL ที่กรอก
          selected={book.selected}
          onSelect={() => onSelect(book.isbn13)}
        />
      ))}
    </div>
  );
}

export default App;
