export default function ProductCard({ product }) {
  // Round rating to nearest whole number for star display
  const stars = Math.round(product.rating.rate);

  return (
    <article className="card">
      <div className="img-wrap">
        <img src={product.image} 
        alt={`Buy ${product.title} online with rating ${product.rating.rate} at mettä muse`} />
      </div>

      <div className="card-body">
        <h4 className="card-title">{product.title}</h4>
        <div className="price">${product.price.toFixed(2)}</div>

        {/* Rating */}
        <div className="rating">
          <span className="stars">
            {"★".repeat(stars)}
            {"☆".repeat(5 - stars)}
          </span>
          <span className="rating-text">
            {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </article>
  );
}
