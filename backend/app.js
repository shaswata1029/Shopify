const express = require("express");
const app = express();
app.use(express.json());

const errorMiddleware = require("./middlewares/errors");

// Import all the routes

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server");
});

app.use("/api/v1", require("./routes/index"));
app.use(errorMiddleware);

module.exports = app;
