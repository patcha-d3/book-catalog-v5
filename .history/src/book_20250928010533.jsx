import "./App.css";

function Book({ image, price, link }) {
  return (
    <div className="card-book">
      <div className="card-book-image">
        {image ? (
          <img src={image} alt={price} />
        ) : (
          <div className="img-placeholder">No image</div>
        )}
      </div>

      <div className="card-book-body">
        {price && <div className="card-book-price">{price}</div>}
        {link && (
          <a
            className="link-button"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            Learn more
          </a>
        )}
      </div>
    </div>
  );
}

export default Book;
