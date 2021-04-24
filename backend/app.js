const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Import all the routes

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server");
});

app.use("/api/v1", require("./routes/index"));
app.use(errorMiddleware);

module.exports = app;
