import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Main",
    available: true
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fileInput = useRef(null);

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (!selectedImage) {
      return;
    }

    setImage(selectedImage);

    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "Main",
      available: true
    });

    setImage(null);
    setImagePreview("");
    setEditingId(null);

    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("available", form.available);

      if (image) {
        formData.append("image", image);
      }

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          formData
        );

        alert("Product updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          formData
        );

        alert("Product added successfully!");
      }

      resetForm();
      getProducts();

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      available: product.available
    });

    if (product.image) {
      setImagePreview(
        `http://localhost:5000${product.image}`
      );
    } else {
      setImagePreview("");
    }

    setImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product deleted");

      getProducts();

    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="admin-products">

      {/* HEADER */}

      <header className="admin-header">

        <div>
          <p className="admin-small-title">
            NAKAMAS ADMIN
          </p>

          <h1>Product Manager</h1>

          <p>
            Manage the food and drinks shown on your customer menu.
          </p>
        </div>

        <div className="admin-count">
          <strong>{products.length}</strong>
          <span>Products</span>
        </div>

      </header>


      {/* ADD / EDIT FORM */}

      <section className="product-form-section">

        <div className="section-title">

          <div>
            <p>MENU MANAGEMENT</p>

            <h2>
              {editingId
                ? "Edit Product"
                : "Add New Product"}
            </h2>
          </div>

          {editingId && (
            <button
              className="cancel-button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}

        </div>


        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

          <div className="form-left">

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Example: Chicken Burger"
              value={form.name}
              onChange={handleChange}
              required
            />


            <label>
              Description
            </label>

            <textarea
              name="description"
              placeholder="Describe the food..."
              value={form.description}
              onChange={handleChange}
              rows="5"
              required
            />


            <div className="two-inputs">

              <div>

                <label>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="249"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>


              <div>

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="Starters">
                    Starters
                  </option>

                  <option value="Main">
                    Main
                  </option>

                  <option value="Drinks">
                    Drinks
                  </option>

                  <option value="Desserts">
                    Desserts
                  </option>

                </select>

              </div>

            </div>


            <label className="available-option">

              <input
                type="checkbox"
                checked={form.available}
                onChange={(event) =>
                  setForm({
                    ...form,
                    available: event.target.checked
                  })
                }
              />

              Product is available

            </label>


            <button
              className="save-button"
              type="submit"
            >
              {editingId
                ? "Update Product"
                : "Add Product"}
            </button>

          </div>


          {/* IMAGE UPLOAD */}

          <div className="image-upload">

            <label>
              Product Photo
            </label>

            <div className="upload-box">

              {imagePreview ? (

                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="image-preview"
                />

              ) : (

                <div className="upload-message">

                  <div className="upload-icon">
                    📸
                  </div>

                  <h3>
                    Upload Food Photo
                  </h3>

                  <p>
                    Choose a photo from your computer
                  </p>

                </div>

              )}

              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

            </div>

          </div>

        </form>

      </section>


      {/* PRODUCTS */}

      <section className="products-section">

        <div className="section-title">

          <div>
            <p>YOUR MENU</p>

            <h2>
              All Products
            </h2>
          </div>

        </div>


        <div className="admin-product-grid">

          {products.length === 0 ? (

            <div className="empty-products">
              <h3>No products yet</h3>
              <p>
                Add your first food item above.
              </p>
            </div>

          ) : (

            products.map((product) => (

              <div
                className="admin-product-card"
                key={product._id}
              >

                <div className="admin-product-image">

                  {product.image ? (

                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                    />

                  ) : (

                    <div>
                      No Image
                    </div>

                  )}

                  <span
                    className={
                      product.available
                        ? "status available"
                        : "status unavailable"
                    }
                  >
                    {product.available
                      ? "Available"
                      : "Unavailable"}
                  </span>

                </div>


                <div className="admin-product-info">

                  <span>
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <strong>
                    ₹{product.price}
                  </strong>


                  <div className="product-actions">

                    <button
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </section>

    </div>
  );
}

export default AdminProducts;