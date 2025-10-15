// Book.jsx
import "./App.css";

export default function Book({
  isbn13,
  title,
  author,
  image,
  price,
  url,
  selected,
  onSelect,
}) {
  return (
    <div
      className={`card-book ${selected ? "selected" : ""}`}
      onClick={() => onSelect(isbn13)}
    >
      <img
        src={image || "https://via.placeholder.com/150x200?text=Book"}
        alt={title}
        className="card-book-image"
      />

      <div className="card-book-body">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">by {author}</p>
        {price && <p className="card-book-price">{price}</p>}
        <a
          href={url || "#"}
          target="_blank"
          rel="noreferrer"
          className="link-button"
        >
          Buy now
        </a>
      </div>
    </div>
  );
}
