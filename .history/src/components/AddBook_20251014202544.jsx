// AddBook.jsx
import { useState } from "react";

function AddBook({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });

  // เก็บค่าที่พิมพ์
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // เมื่อกด Save
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      alert("Please enter at least a title and author.");
      return;

      console.log("✅ handleSubmit is running", formData);
    }

    // ✅ ส่งข้อมูลกลับไปที่ App.jsx
    onAdd(formData);

    // เคลียร์ฟอร์ม
    setFormData({ title: "", author: "", url: "" });

    // ✅ ปิด modal (ถ้าใช้ <dialog>)
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.close();
  };

  return (
    <div className="form-container">
      <h2>New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Book title..."
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            placeholder="Author..."
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label>Cover URL</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            placeholder="https://example.com/cover.jpg"
            onChange={handleChange}
          />
        </div>

        <button className="btn primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddBook;
