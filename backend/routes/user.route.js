const express = require("express");
const router = express.Router();
const validate = require("../middleware/validator");
const { registerUserSchema } = require("../validators/user.validator");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  validate(registerUserSchema),
  userController.registerUser
);

module.exports = router;
