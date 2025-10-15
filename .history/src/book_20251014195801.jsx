export default function Book({
  id,
  title,
  author,
  image,

  selected,
  onSelect,
}) {
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div
      className={`card book-card ${selected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <img src={image} alt={title} className="book-image" />
      <h3 className="book-title">{title}</h3>
      <p className="book-author">by {author}</p>
    </div>
  );
}
