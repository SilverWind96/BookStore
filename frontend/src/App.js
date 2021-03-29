import "./App.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { listProductGenres } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import { useEffect, useState } from "react";

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productGenreList = useSelector((state) => state.productGenreList);
  const {
    loading: loadingGenres,
    error: errorGenres,
    genres,
  } = productGenreList;
  useEffect(() => {
    dispatch(listProductGenres());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="container-80 row">
            <div>
              <button
                type="button"
                className="open-sidebar"
                onClick={() => setSidebarIsOpen(true)}
              >
                <i className="fa fa-bars"></i>
              </button>
              <Link to="/" className="brand">
                Eternal
              </Link>
            </div>
            <div className="search">
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              ></Route>
            </div>
            <div>
              <Link to="/cart">
                Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.result.fullName}{" "}
                    <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <Link to="/signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
            </div>
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="genres">
            <li>
              <strong>Genres</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fas fa-times"></i>
              </button>
            </li>
            {loadingGenres ? (
              <LoadingBox></LoadingBox>
            ) : errorGenres ? (
              <MessageBox variant="danger">{errorGenres}</MessageBox>
            ) : (
              genres.map((g) => (
                <li key={g}>
                  <Link
                    to={`/search/genre/${g}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {g}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <div className="container-80">
          <main>
            <Route
              path="/search/genre/:genre/name/:name/min/:min/max/:max/rating/:rating/order/:order"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/genre/:genre"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/genre/:genre/name/:name"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/name/:name?"
              component={SearchScreen}
              exact
            ></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/signin/:id?" component={SigninScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </main>
        </div>

        <footer className="row center">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
