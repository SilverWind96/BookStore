import Rating from "./Rating";
import Discount from "./Discount";
const product = (props) => {
  const { product } = props;
  return (
    <div key={product.id} className="card">
      <a href={`/product/${product.id}`}>
        <img className="medium" src={product.image} alt="bookImage" />
      </a>
      <div className="card-body">
        <a href={`/product/${product.id}`}>
          <h2>{product.title}</h2>
        </a>
        <h3 className="author">{product.author}</h3>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="price">
          {product.price}đ{" "}
          <span className="old-price">{product.oldPrice}đ</span>
          <Discount oldPrice={product.oldPrice} price={product.price} />
        </div>
      </div>
    </div>
  );
};

export default product;
