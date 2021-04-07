const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.get("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
router.post("/password/forgot", authController.forgotPassword);

module.exports = router;
