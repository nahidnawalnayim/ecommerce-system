const Cart = require("../../models/CartModel");
const Wishlist = require("../../models/WishListModel");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const express=require("express");
const app = express();
// Add to wishlist
const mysql = require("mysql");
const cors = require("cors");
// Create Order
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "thesisCart",
  });
exports.createWishlist = catchAsyncErrors(async (req, res, next) => {
  const {
    productName,
    quantity,
    productImage,
    productPrice,
    userId,
    productId,
    Stock,
  } = req.body;

  db.query(
    "INSERT INTO ecomcart (productName, quantity, productImage, productPrice, userId,productId,Stock) VALUES (?,?,?,?,?,?,?)",
    [productName, quantity, productImage, productPrice, userId,productId,Stock],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted in mysql");
      }
    }
  );

  res.status(200).json({
    success: true
    
  });
});
