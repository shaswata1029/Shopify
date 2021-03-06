const express = require("express");
const router = express.Router();

router.use("/product", require("./product"));
router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/order", require("./order"));
router.use("/review", require("./review"));

module.exports = router;
