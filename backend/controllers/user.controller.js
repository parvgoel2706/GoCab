const userService = require("../services/user.service");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { user, token } = await userService.createUser(req.body);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};
