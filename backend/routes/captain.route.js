const express = require("express");
const validate = require("../middleware/validator.middleware");
const captainValidator = require("../validators/captain.validator");
const captainController = require("../controllers/captain.controller");
const captainAuthMiddleware = require("../middleware/captainAuth.middleware");
const router = express.Router();

router.post(
  "/register",
  validate(captainValidator.registerCaptainSchema),
  captainController.registerCaptain
);

module.exports = router;
