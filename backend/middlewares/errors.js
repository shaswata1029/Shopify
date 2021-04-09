const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "DEVELOPMENT")
    res.status(err.statusCode).json({
      sucess: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });

  // Wrong Mongoose Id Error
  if (process.env.NODE_ENV === "PRODUCTION") {
    if (err.name === "CastError") {
      const message = `Resource not found.Invalid ${err.path}`;
      err = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      err = new ErrorHandler(message, 400);
    }

    // Handling mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      err = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT key error
    if (err.name === "JsonWebTokenError") {
      const message = `JSON Web Token is Invalid.Try Again`;
      err = new ErrorHandler(message, 400);
    }

    // Handling Expire JWT key error
    if (err.name === "TokenExpiredError") {
      const message = `JSON Web Token is Expired.Try Again`;
      err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      sucess: false,
      message: err.message || "Internal Server Error",
    });
  }
};
