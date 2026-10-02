import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    getCartTotal
  } = useCart();

  const total = getCartTotal();

  const handleContinue = () => {
    navigate("/order-type");
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">

        <div className="checkout-empty">

          <p>NAKAMAS</p>

          <h1>Your Cart is Empty</h1>

          <span>
            Add something delicious before checking out.
          </span>

          <Link to="/menu">
            Browse Menu
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-header">

        <p>NAKAMAS</p>

        <h1>Checkout</h1>

        <span>
          Let's get your order ready.
        </span>

      </div>


      <div className="checkout-content">

        <div className="checkout-items">

          <h2>
            Your Order
          </h2>

          {cart.map((item) => (

            <div
              className="checkout-item"
              key={item._id}
            >

              <div className="checkout-item-image">

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


              <div className="checkout-item-info">

                <span>
                  {item.category}
                </span>

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{item.price} × {item.quantity}
                </p>

              </div>


              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>

          ))}

        </div>


        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>

          <div className="summary-row">

            <span>
              Items
            </span>

            <span>
              {cart.reduce(
                (count, item) =>
                  count + item.quantity,
                0
              )}
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


          <button
            className="continue-button"
            onClick={handleContinue}
          >
            Continue
          </button>


          <Link
            to="/cart"
            className="back-cart"
          >
            ← Back to Cart
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Checkout;