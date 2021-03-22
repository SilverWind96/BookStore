import { addToCart, removeFromCart } from "../actions/cartActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import CurrencyFormat from "../components/CurrencyFormat";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
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
            {/* <li>
              <div className="row">
                <div>a</div>
                <div className="min-30">Name</div>
                <div>Quantity</div>
                <div>Price</div>
                <div></div>
              </div>
            </li> */}
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product}>
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
                        <Link to={`/product/${item.product}`}>
                          {item.title}
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div>
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div>
                        <CurrencyFormat number={item.price} />
                      </div>
                    </td>
                    <td>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.title} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.title}</Link>
                  </div>
                  <div>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))} */}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) items
                :{" "}
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
