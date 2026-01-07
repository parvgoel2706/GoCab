const Joi = require("joi");

module.exports.registerCaptainSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().required().min(3),
    lastname: Joi.string().min(3).optional(),
  }).required(),
  email: Joi.string().email().min(6).lowercase().required(),
  password: Joi.string().min(8).required(),
  status: Joi.string().valid("active", "inactive").default("inactive"),
  vehicle: Joi.object({
    color: Joi.string().required().min(3),
    plate: Joi.string().required().min(7),
    capacity: Joi.number().required().min(1),
    vehicleType: Joi.string().required().valid("car", "motorcycle", "auto"),
  }).required(),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
});

module.exports.loginCaptainSchema = Joi.object({
  email: Joi.string().email().min(6).lowercase().required(),
  password: Joi.string().min(8).required(),
});
