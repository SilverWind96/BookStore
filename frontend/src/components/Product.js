import Rating from "./Rating";
import Discount from "./Discount";
import { Link } from "react-router-dom";
import CurrencyFormat from "./CurrencyFormat";
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
          <CurrencyFormat number={product.price} />{" "}
          <span className="old-price">
            <CurrencyFormat number={product.oldPrice} />
          </span>
          <Discount oldPrice={product.oldPrice} price={product.price} />
        </div>
      </div>
    </div>
  );
};

export default product;
