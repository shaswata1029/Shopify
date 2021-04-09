const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/", isAuthenticatedUser, userController.getUserProfile);
router.put(
  "/password/update",
  isAuthenticatedUser,
  userController.updatePassword
);
router.put(
  "/profile/update",
  isAuthenticatedUser,
  userController.updateProfile
);

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.getAllUsers
);

router
  .route("/admin/user/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userController.getUserDetails
  )
  .put(isAuthenticatedUser, authorizeRoles("admin"), userController.updateUser)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userController.deleteUser
  );

module.exports = router;
