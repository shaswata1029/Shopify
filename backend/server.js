const app = require("./app");
// const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// Handle the Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR :${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// setting up config files in development mode only
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

const db = require("./config/mongoose");

const PORT = process.env.PORT;

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
  console.log(
    `Server started on PORT : ${PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR :${err}`);
  console.log("Shutting down the server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
