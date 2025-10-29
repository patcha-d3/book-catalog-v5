// components/AddBook.jsx
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

    // trim ข้อมูลหลัก ๆ กันช่องว่างล้วน
    const payload = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      publisher: formData.publisher.trim(),
      language: formData.language.trim(),
      // แปลงเป็นตัวเลขถ้ากรอก (ไม่งั้นปล่อยว่าง)
      year: formData.year ? Number(formData.year) : "",
      pages: formData.pages ? Number(formData.pages) : "",
      url: formData.url.trim(),
    };

    if (!payload.title || !payload.author) {
      alert("Please enter at least a title and author.");
      return;
    }

    onAdd(payload);

    // reset ฟอร์ม
    setFormData({
      title: "",
      author: "",
      publisher: "",
      year: "",
      language: "",
      pages: "",
      url: "",
    });

    // ปิด dialog เฉพาะตัวที่ครอบฟอร์มนี้
    const dialog = e.target.closest("dialog");
    if (dialog) dialog.close();
  };

  return (
    <div className="form-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="modal-form" noValidate>
        <div className="form-row">
          <label htmlFor="title">
            Title<span aria-hidden="true"> *</span>
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book title"
            required
            autoFocus
          />
        </div>

        <div className="form-row">
          <label htmlFor="author">
            Author<span aria-hidden="true"> *</span>
          </label>
          <input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="publisher">Publisher</label>
          <input
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Publisher"
          />
        </div>

        <div className="form-row">
          <label htmlFor="year">Publication Year</label>
          <input
            id="year"
            name="year"
            type="number"
            inputMode="numeric"
            min="0"
            max="9999"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. 2024"
          />
        </div>

        <div className="form-row">
          <label htmlFor="language">Language</label>
          <input
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Language"
          />
        </div>

        <div className="form-row">
          <label htmlFor="pages">Pages</label>
          <input
            id="pages"
            name="pages"
            type="number"
            inputMode="numeric"
            min="1"
            value={formData.pages}
            onChange={handleChange}
            placeholder="e.g. 320"
          />
        </div>

        <div className="form-row">
          <label htmlFor="url">Url Link (cover image)</label>
          <input
            id="url"
            name="url"
            type="url"
            inputMode="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com/cover.jpg"
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
