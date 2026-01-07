const express = require("express");
const router = express.Router();
const validate = require("../middleware/validator.middleware");
const userAuthMiddleware = require("../middleware/userAuth.middleware");
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
router.post("/logout", userAuthMiddleware, userController.logoutUser);
router.post("/logoutAll", userAuthMiddleware, userController.logoutAll);

module.exports = router;
