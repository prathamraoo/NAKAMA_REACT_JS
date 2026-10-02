import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import "./App.css";

import { CartProvider } from "./components/CartContext";
import Navbar from "./components/Navbar";

import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";


function Home() {
  return (
    <div className="home">

      <section className="hero">

        <div className="hero-content">

          <p className="small-title">
            WELCOME TO
          </p>

          <h1>
            NAKAMAS
          </h1>

          <h2>
            Good Food. Good People. Good Times.
          </h2>

          <p className="hero-text">
            A place where great food meets great moments.
            Dine with us, order your favourites, or celebrate
            something special.
          </p>

          <div className="hero-buttons">

            <Link
              to="/menu"
              className="primary-btn"
            >
              Explore Menu
            </Link>

            <Link
              to="/booking"
              className="secondary-btn"
            >
              Book a Table
            </Link>

          </div>

        </div>

      </section>


      <section className="features">

        <div className="feature-card">
          <div>🍔</div>

          <h3>
            Fresh Food
          </h3>

          <p>
            Delicious food prepared fresh for you.
          </p>
        </div>


        <div className="feature-card">
          <div>🥡</div>

          <h3>
            Takeaway
          </h3>

          <p>
            Order online and pick it up when ready.
          </p>
        </div>


        <div className="feature-card">
          <div>🪑</div>

          <h3>
            Dine With Us
          </h3>

          <p>
            Book your table and enjoy the NAKAMAS experience.
          </p>
        </div>


        <div className="feature-card">
          <div>🎉</div>

          <h3>
            Events
          </h3>

          <p>
            Make your special occasions unforgettable.
          </p>
        </div>

      </section>


      <footer>

        <h2>
          NAKAMAS
        </h2>

        <p>
          Good Food. Good People. Good Times.
        </p>

        <p>
          © 2026 NAKAMAS. All rights reserved.
        </p>

      </footer>

    </div>
  );
}


function App() {
  return (
    <CartProvider>

      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/menu"
            element={<Menu />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

        </Routes>

      </BrowserRouter>

    </CartProvider>
  );
}


export default App;