import { useState } from "react";

function AddBook({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    language: "",
    pages: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      alert("Please enter at least a title and author.");
      return;
    }

    // ✅ ส่งข้อมูลกลับไป App.jsx
    onAdd(formData);

    // ✅ รีเซ็ตค่า
    setFormData({
      title: "",
      author: "",
      publisher: "",
      year: "",
      language: "",
      pages: "",
      url: "",
    });

    // ✅ ปิด dialog
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.close();
  };

  return (
    <div className="form-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-row">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book title"
          />
        </div>

        <div className="form-row">
          <label>Author</label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
          />
        </div>

        <div className="form-row">
          <label>Publisher</label>
          <input
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Publisher"
          />
        </div>

        <div className="form-row">
          <label>Publication Year</label>
          <input
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            placeholder="Publication Year"
          />
        </div>

        <div className="form-row">
          <label>Language</label>
          <input
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Language"
          />
        </div>

        <div className="form-row">
          <label>Pages</label>
          <input
            name="pages"
            type="number"
            value={formData.pages}
            onChange={handleChange}
            placeholder="Pages"
          />
        </div>

        <div className="form-row">
          <label>Url Link (cover image)</label>
          <input
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="e.g. https://example.com"
          />
        </div>

        <div className="modal-buttons">
          <button type="submit" className="btn primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
