const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/", productController.getProducts);
router.post(
  "/admin/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.newProduct
);
router.get("/:id", productController.getSingleProduct);
router
  .route("/admin/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.updateProduct
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.deleteProduct
  );

module.exports = router;
