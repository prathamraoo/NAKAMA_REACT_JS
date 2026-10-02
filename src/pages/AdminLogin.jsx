import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          username,
          password
        }
      );

      localStorage.setItem("nakamasAdmin", "true");

      navigate("/admin/products");

    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-box">

        <div className="admin-login-logo">
          NAKAMAS
        </div>

        <p className="admin-login-label">
          ADMIN PANEL
        </p>

        <h1>
          Welcome Back
        </h1>

        <p className="admin-login-description">
          Login to manage your café.
        </p>


        <form onSubmit={handleLogin}>

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            required
          />


          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />


          {error && (
            <p className="login-error">
              {error}
            </p>
          )}


          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;