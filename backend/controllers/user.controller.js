const userService = require("../services/user.service");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { user, token } = await userService.createUser(req.body);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

module.exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.userLogin({
      email,
      password,
    });
    res.status(200).json({
      authStatus: "authenticated",
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};
