import { useEffect, useState } from "react";

function AddBook({ onAdd, initialData = null, submitLabel = "Save" }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    language: "",
    pages: "",
    url: "",
  });

  // ✅ เติมค่าเริ่มต้นตอนเปิดโหมดแก้ไข
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        publisher: initialData.publisher || "",
        year: initialData.year ?? "",
        language: initialData.language || "",
        pages: initialData.pages ?? "",
        url: initialData.url || initialData.image || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      publisher: formData.publisher.trim(),
      language: formData.language.trim(),
      year: formData.year ? Number(formData.year) : "",
      pages: formData.pages ? Number(formData.pages) : "",
      url: formData.url.trim(),
    };

    if (!payload.title || !payload.author) {
      alert("Please enter at least a title and author.");
      return;
    }

    onAdd(payload);

    // reset เฉพาะตอน add (ไม่รีเซ็ตเวลา edit)
    if (!initialData) {
      setFormData({
        title: "",
        author: "",
        publisher: "",
        year: "",
        language: "",
        pages: "",
        url: "",
      });
    }

    // ปิด dialog ตัวที่ครอบอยู่
    e.target.closest("dialog")?.close();
  };

  return (
    <div className="form-container">
      <h2>{initialData ? "Edit Book" : "Add New Book"}</h2>
      <form onSubmit={handleSubmit} className="modal-form" noValidate>
        <div className="form-row">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book title"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="author">Author *</label>
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
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
