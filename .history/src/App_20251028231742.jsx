// App.jsx
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Modal from "./components/Modal.jsx";
import AddBook from "./components/AddBook.jsx";
import Book from "./book.jsx";
import BookFilter from "./components/BookFilter.jsx";

const LS_KEY = "books_v5";

function App() {
  const [books, setBooks] = useState([]);

  // Filter state (ตัวอย่าง: author)
  const [filterCriteria, setFilterCriteria] = useState({ author: "" });

  // Edit dialog state
  const editDialogRef = useRef(null);
  const [editingBook, setEditingBook] = useState(null);

  // LocalStorage: load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setBooks(parsed);
      }
    } catch {}
  }, []);

  // LocalStorage: save on change
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(books));
  }, [books]);

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
      isbn13: crypto?.randomUUID?.() ?? String(Date.now()),
      selected: false,
      image: newBook.url || "https://via.placeholder.com/150x200?text=Book",
      url: newBook.url || "#",
      isUserAdded: true,
    };
    setBooks((prev) => [...prev, withDefaults]);
  };

  // ลบหนังสือที่เลือก
  const handleDeleteBook = () => {
    const selectedBook = books.find((b) => b.selected);
    if (!selectedBook) return alert("Please select a book to delete.");
    setBooks((prev) => prev.filter((b) => b.isbn13 !== selectedBook.isbn13));
  };

  // เปิดฟอร์มแก้ไข
  const handleUpdateBook = () => {
    const selectedBook = books.find((b) => b.selected);
    if (!selectedBook) return alert("Please select a book to edit.");
    setEditingBook(selectedBook);
    editDialogRef.current?.showModal();
  };

  // บันทึกผลการแก้ไข
  const handleSubmitEdit = (patch) => {
    if (!editingBook) return;
    setBooks((prev) =>
      prev.map((b) =>
        b.isbn13 === editingBook.isbn13
          ? {
              ...b,
              ...patch,
              image: patch.url || b.image, // อัปเดตรูปถ้าเปลี่ยน URL
            }
          : b
      )
    );
    setEditingBook(null);
  };

  // Filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((p) => ({ ...p, [name]: value }));
  };

  const uniqueAuthors = [
    ...new Set(books.map((b) => b.author).filter(Boolean)),
  ].sort();

  const filteredBooks = books.filter((b) => {
    const byAuthor =
      !filterCriteria.author || b.author === filterCriteria.author;
    return byAuthor;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Catalog 5</h1>
      </header>

      <main className="content">
        {/* 🔹 แถวบน: Filter กลางหน้า */}
        <div className="filters-row">
          <BookFilter
            filterCriteria={filterCriteria}
            onFilterChange={handleFilterChange}
            authors={uniqueAuthors}
          />
        </div>

        {/* 🔹 แถวล่าง: สองคอลัมน์ (ซ้ายปุ่ม/ขวาการ์ด) */}
        <div className="content-body">
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

          <BookTile books={filteredBooks} onSelect={toggleSelect} />
        </div>
      </main>

      <footer className="footer">
        <p>© Pat Sricome, 2025</p>
      </footer>

      {/* Edit dialog */}
      <dialog ref={editDialogRef}>
        {editingBook && (
          <AddBook
            onAdd={handleSubmitEdit}
            initialData={editingBook}
            submitLabel="Update"
          />
        )}
      </dialog>
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
