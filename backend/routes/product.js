const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.post("/admin/new", productController.newProduct);
router.get("/:id", productController.getSingleProduct);
router
  .route("/admin/:id")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
