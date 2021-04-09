const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new", isAuthenticatedUser, orderController.newOrder);
router.get("/user/:id", isAuthenticatedUser, orderController.getSingleOrder);
router.get("/user", isAuthenticatedUser, orderController.userOrders);

module.exports = router;
