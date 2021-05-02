const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());

// Import all the routes

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server");
});

app.use("/api/v1", require("./routes/index"));
app.use(errorMiddleware);

module.exports = app;
