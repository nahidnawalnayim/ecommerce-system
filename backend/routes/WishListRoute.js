const express = require("express");
const {
  //addToWishlist,
  getWishlistData,
  removeWishlistData,
  addToCart,
  getCartData,
  updateCart,
  removeCartData,
} = require("../controller/cart/CartController");
const {createWishlist}=require('../controller/cart/cartsql')
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/wishlist").get(isAuthenticatedUser, getWishlistData);

router.route("/addToWishlist").post(isAuthenticatedUser, createWishlist);

router
  .route("/removeWishlist/:id")
  .delete(isAuthenticatedUser, removeWishlistData);

router.route("/addToCart").post(isAuthenticatedUser, addToCart);

router.route("/cart").get(isAuthenticatedUser, getCartData);

router.route("/cart/update/:id").put(isAuthenticatedUser, updateCart);

router.route("/removeCart/:id").delete(isAuthenticatedUser, removeCartData);

module.exports = router;
