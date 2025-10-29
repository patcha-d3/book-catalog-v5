// App.jsx
import { useState } from "react";
import style from "./App.css";
import Modal from "./components/Modal.jsx";
import AddBook from "./components/AddBook.jsx";
import Book from "./book.jsx";
import BookFilter from "./components/BookFilter.jsx"; // 👈 เพิ่มการ import

function App() {
  const [books, setBooks] = useState([]);

  // ✅ state สำหรับฟิลเตอร์
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
      isbn13:
        (window.crypto && crypto.randomUUID && crypto.randomUUID()) ||
        String(Date.now()),
      selected: false,
      image: newBook.url || "https://via.placeholder.com/150x200?text=Book",
      url: newBook.url || "#",
      isUserAdded: true, // 👈 ใช้ flag นี้ถ้าจะกรองเฉพาะหนังสือที่ผู้ใช้เพิ่ม
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

  // Update = no-op
  const handleUpdateBook = () => {
    const selectedBook = books.find((b) => b.selected);
    if (!selectedBook) {
      alert("Please select a book to update.");
      return;
    }
    alert("Update feature coming soon!");
  };

  // ✅ handler สำหรับเปลี่ยนค่าฟิลเตอร์
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ รายชื่อผู้เขียน (unique + เรียง) — ตอนนี้ดึงจากทุกเล่มใน state
  // ถ้าอยากให้มีเฉพาะของที่ผู้ใช้เพิ่ม ให้เติม .filter(b => b.isUserAdded) ก่อน map
  const uniqueAuthors = [
    ...new Set(
      books
        // .filter((b) => b.isUserAdded) // <— uncomment ถ้าจะใช้เฉพาะที่ผู้ใช้เพิ่ม
        .map((b) => b.author)
        .filter(Boolean)
    ),
  ].sort();

  // ✅ กรองหนังสือก่อนส่งไปแสดง
  const filteredBooks = books.filter((book) => {
    // ถ้าจะโชว์เฉพาะ user-added: เปิดบรรทัดด้านล่าง
    // if (!book.isUserAdded) return false;

    const matchesAuthor =
      !filterCriteria.author || book.author === filterCriteria.author;
    return matchesAuthor;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Catalog v4</h1>
      </header>

      <main className="content">
        <div className="content-add">
          {/* ✅ ส่วนฟิลเตอร์ */}
          <BookFilter
            filterCriteria={filterCriteria}
            onFilterChange={handleFilterChange}
            authors={uniqueAuthors}
          />

          {/* ปุ่ม Add + modal */}
          <Modal btnLabel="Add" btnClassName="button-add">
            <AddBook onAdd={handleAddBook} />
          </Modal>

          {/* ปุ่ม Update / Delete */}
          <div className="action-buttons">
            <button className="button-update" onClick={handleUpdateBook}>
              Edit
            </button>
            <button className="button-delete" onClick={handleDeleteBook}>
              Delete
            </button>
          </div>
        </div>

        {/* ใช้ filteredBooks แทน books */}
        <BookTile books={filteredBooks} onSelect={toggleSelect} />
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
        <p style={{ color: "gray" }}>No books found.</p>
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
          selected={book.selected}
          onSelect={() => onSelect(book.isbn13)}
        />
      ))}
    </div>
  );
}

export default App;
