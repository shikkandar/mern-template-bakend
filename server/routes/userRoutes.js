const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Apply authentication middleware to protected routes
router
  .route("/api/users")
  .get(userController.list) // Protect the list route
  .post(userController.create); // Registration might not need protection

router
  .route("/api/users/:userId")
  .get(userController.read) // Protect user profile access
  .put(userController.update) // Protect profile update
  .delete(userController.remove); // Protect delete operation

// router.param("userId", userController.userByID);

module.exports = router;
