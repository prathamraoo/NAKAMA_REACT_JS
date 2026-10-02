const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();

/* IMAGE UPLOAD */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const fileName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage
});


/* GET ALL PRODUCTS */

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1
    });

    res.json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get products"
    });
  }
});


/* ADD PRODUCT */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      available
    } = req.body;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      available: available !== "false"
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add product"
    });
  }
});


/* UPDATE PRODUCT */

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      available
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.available = available !== "false";

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update product"
    });
  }
});


/* DELETE PRODUCT */

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete product"
    });
  }
});


module.exports = router;