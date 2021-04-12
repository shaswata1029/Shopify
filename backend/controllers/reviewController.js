const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create/Update Review of a product
module.exports.createProductReview = catchAsyncErrors(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found with this id", 404));
    }

    const isReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    product.ratings =
      product.reviews.reduce((acc, review) => review.rating + acc, 0) /
      product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Review added/updated successfully",
    });
  }
);

// Get Product Reviews of a Products

module.exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete the review of a product

module.exports.deleteProductReview = catchAsyncErrors(
  async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHandler("Product not found with this id", 404));
    }

    const reviews = product.reviews.filter(
      (review) => review.user.toString() !== req.user._id.toString()
    );

    const numOfReviews = reviews.length;

    let ratings = 0;
    if (numOfReviews > 0) {
      ratings =
        reviews.reduce((acc, review) => review.rating + acc, 0) /
        product.reviews.length;
    }

    await Product.findByIdAndUpdate(
      req.query.id,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  }
);
