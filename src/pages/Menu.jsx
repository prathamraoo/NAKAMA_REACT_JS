import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../components/CartContext";
import "./Menu.css";

function Menu() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { addToCart } = useCart();

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.log("Failed to load products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const categories = [
    "All",
    "Starters",
    "Main",
    "Drinks",
    "Desserts"
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product.name);

    addToCart(product);
  };

  return (
    <div className="menu-page">

      <section className="menu-header">

        <p>NAKAMAS</p>

        <h1>
          OUR MENU
        </h1>

        <span>
          Freshly made. Made for you.
        </span>

      </section>


      <div className="categories">

        {categories.map((category) => (

          <button
            key={category}
            type="button"
            onClick={() =>
              setSelectedCategory(category)
            }
          >
            {category}
          </button>

        ))}

      </div>


      <section className="menu-grid">

        {filteredProducts.length === 0 ? (

          <p style={{ textAlign: "center" }}>
            No products available.
          </p>

        ) : (

          filteredProducts.map((product) => (

            <div
              className="menu-card"
              key={product._id}
            >

              <div className="food-image">

                {product.image ? (

                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                  />

                ) : (

                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#2a211b",
                      color: "#aaa"
                    }}
                  >
                    No Image
                  </div>

                )}

              </div>


              <div className="food-info">

                <span className="food-category">
                  {product.category}
                </span>

                <h2>
                  {product.name}
                </h2>

                <p>
                  {product.description}
                </p>


                <div className="food-bottom">

                  <strong>
                    ₹{product.price}
                  </strong>


                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    + Add
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </section>

    </div>
  );
}

export default Menu;