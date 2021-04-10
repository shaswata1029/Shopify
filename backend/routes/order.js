const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new", isAuthenticatedUser, orderController.newOrder);
router.get("/user/:id", isAuthenticatedUser, orderController.getSingleOrder);
router.get("/user", isAuthenticatedUser, orderController.userOrders);
router.get(
  "/admin",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.allOrders
);

router
  .route("/admin/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    orderController.updateOrder
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    orderController.deleteOrder
  );

module.exports = router;
