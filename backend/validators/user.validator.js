const Joi = require("joi");

module.exports.registerUserSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().required().min(3),
    lastname: Joi.string().min(3).optional(),
  }).required(),
  email: Joi.string().email().min(6).lowercase().required(),
  password: Joi.string().min(8).required(),
});

module.exports.loginUserSchema = Joi.object({
  email: Joi.string().email().min(6).lowercase().required(),
  password: Joi.string().min(8).required(),
});
