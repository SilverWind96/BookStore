import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="container-80 row">
            <div>
              <a href="/" className="brand">
                Eternal
              </a>
            </div>
            <div>
              <a href="cart.html">Cart</a>
              <a href="signin.html">Sign In</a>
            </div>
          </div>
        </header>
        <div className="container-80">
          <main>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </main>
        </div>

        <footer className="row center">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
