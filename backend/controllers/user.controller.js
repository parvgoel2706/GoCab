const userService = require("../services/user.service");
const isProd = process.env.NODE_ENV === "production";
const accessTokenOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "None" : "Lax",
};
const refreshTokenOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "None" : "Strict",
  path: "user/refresh",
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await userService.createUser({
      ...req.body,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });
    res.cookie("user_accessToken", accessToken, accessTokenOptions);
    res.cookie("user_refreshToken", refreshToken, refreshTokenOptions);
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

module.exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await userService.userLogin({
      email,
      password,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });
    res.cookie("user_accessToken", accessToken, {
      ...accessTokenOptions,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("user_refreshToken", refreshToken, {
      ...refreshTokenOptions,
      maxAge: 7 * 60 * 60 * 1000,
    });
    res.status(200).json({
      authStatus: "authenticated",
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookie?.refreshToken; //undefined as refresh token is only sent to /auth/refresh
    await userService.logoutUser(refreshToken);
    res
      .clearCookie("user_accessToken", accessTokenOptions)
      .clearCookie("user_refreshToken", refreshTokenOptions);
    res.status(200).json({ message: "Successfully logout." });
  } catch (err) {
    next(err);
  }
};

module.exports.logoutAll = async (req, res, next) => {
  try {
    let user = req.user;
    await userService.logoutAll(user._id);
    res
      .clearCookie("user_accessToken", accessTokenOptions)
      .clearCookie("user_refreshToken", refreshTokenOptions);
    res.status(200).json({ message: "Successfully logout from all devices." });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserProfile = (req, res, next) => {
  return res.status(200).json(req.user);
};
