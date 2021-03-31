import { addToCart, deleteItem } from "../actions/cartActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import CurrencyFormat from "../components/CurrencyFormat";
import NumberInputBox from "../components/NumberInputBox";

export default function CartScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const productId = props.match.params.id;
  const quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId && userInfo) {
      dispatch(addToCart(productId, quantity, userInfo));
    }
  }, [dispatch, productId, quantity, userInfo]);

  const removeFromCartHandler = (id) => {
    // dispatch(removeFromCart(id));
    dispatch(deleteItem(userInfo, id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>Cart is empty.</MessageBox>
        ) : (
          <ul>
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Subtotal</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="small"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="min-30">
                        <Link to={`/product/${item.productId}`}>
                          {item.title}
                        </Link>
                      </div>
                    </td>
                    <td>
                      <NumberInputBox item={item} userInfo={userInfo} />
                    </td>
                    <td>
                      <div>
                        <CurrencyFormat number={item.price} />
                      </div>
                    </td>
                    <td>
                      <CurrencyFormat number={item.price * item.quantity} />
                    </td>
                    <td>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCartHandler(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}) items :{" "}
                {
                  <CurrencyFormat
                    number={cartItems.reduce(
                      (a, c) => a + c.quantity * c.price,
                      0
                    )}
                  />
                }
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
