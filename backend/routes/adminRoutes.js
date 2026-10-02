const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:");
  console.log("Username entered:", username);
  console.log("Password entered:", password);
  console.log("Expected username:", process.env.ADMIN_USERNAME);
  console.log("Expected password:", process.env.ADMIN_PASSWORD);

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    console.log("LOGIN SUCCESS");

    return res.json({
      success: true,
      message: "Admin login successful"
    });
  }

  console.log("LOGIN FAILED");

  res.status(401).json({
    success: false,
    message: "Invalid username or password"
  });
});

module.exports = router;