const Product = require("../models/product");
const products = require("../data/products.json");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// setting dotenv file path
dotenv.config({ path: "backend/config/config.env" });

const db = require("../config/mongoose");

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All Products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
