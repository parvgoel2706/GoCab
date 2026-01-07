const express = require("express");
const router = express.Router();
const validate = require("../middleware/validator.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const userValidator = require("../validators/user.validator");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  validate(userValidator.registerUserSchema),
  userController.registerUser
);

router.post(
  "/login",
  validate(userValidator.loginUserSchema),
  userController.userLogin
);

// router.post("/refresh", authController.refreshToken);
router.post("/logout", authMiddleware, userController.logoutUser);
router.post("/logoutAll", authMiddleware, userController.logoutAll);

module.exports = router;
