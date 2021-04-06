const app = require("./app");
const dotenv = require("dotenv");

// Handle the Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR :${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

const db = require("./config/mongoose");

const PORT = process.env.PORT;

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
