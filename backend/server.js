const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

const db = require("./config/mongoose");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server started on PORT : ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
