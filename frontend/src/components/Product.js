import Rating from "./Rating";
import Discount from "./Discount";
import { Link } from "react-router-dom";
const product = (props) => {
  const { product } = props;
  return (
    <div key={product.id} className="card">
      <Link to={`/product/${product.id}`}>
        <img className="medium" src={product.image} alt="bookImage" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.id}`}>
          <h2>{product.title}</h2>
        </Link>
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
