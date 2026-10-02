import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartTotal
  } = useCart();

  const total = getCartTotal();

  const itemCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <div className="cart-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="cart-header">

        <p>NAKAMAS</p>

        <h1>
          Your Cart
        </h1>

        <span>
          Good food is waiting for you.
        </span>

      </div>


      {/* =========================
          EMPTY CART
      ========================= */}

      {cart.length === 0 ? (

        <div className="empty-cart">

          <p>NAKAMAS</p>

          <h1>
            Your Cart is Empty
          </h1>

          <span>
            Looks like you haven't added anything yet.
          </span>

          <Link to="/menu">
            Browse Menu
          </Link>

        </div>

      ) : (

        /* =========================
           CART CONTENT
        ========================= */

        <div className="cart-content">


          {/* =========================
              CART ITEMS
          ========================= */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item._id}
              >

                {/* FOOD IMAGE */}

                <div className="cart-item-image">

                  {item.image ? (

                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                    />

                  ) : (

                    <span>
                      No Image
                    </span>

                  )}

                </div>


                {/* FOOD INFORMATION */}

                <div className="cart-item-info">

                  <span>
                    {item.category}
                  </span>

                  <h2>
                    {item.name}
                  </h2>

                  <p>
                    ₹{item.price}
                  </p>

                </div>


                {/* ACTIONS */}

                <div className="cart-item-actions">

                  <div className="quantity">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                    >
                      −
                    </button>

                    <strong>
                      {item.quantity}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                    >
                      +
                    </button>

                  </div>


                  <strong className="item-total">
                    ₹{item.price * item.quantity}
                  </strong>


                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>


            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {itemCount}
              </span>

            </div>


            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹{total}
              </span>

            </div>


            <div className="summary-line"></div>


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>


            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Checkout
            </Link>


            {/* CONTINUE SHOPPING */}

            <Link
              to="/menu"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;