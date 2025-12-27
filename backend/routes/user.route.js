const express = require("express");
const router = express.Router();
const validate = require("../middleware/validator.middleware");
const {
  registerUserSchema,
  loginUserSchema,
} = require("../validators/user.validator");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  validate(registerUserSchema),
  userController.registerUser
);

router.post("/login", validate(loginUserSchema), userController.userLogin);

module.exports = router;
