const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
router.post("/password/forgot", authController.forgotPassword);
router.put("/password/reset/:token", authController.resetPassword);

module.exports = router;
