const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/")
  .put(isAuthenticatedUser, reviewController.createProductReview)
  .get(reviewController.getProductReviews)
  .delete(isAuthenticatedUser, reviewController.deleteProductReview);

module.exports = router;
