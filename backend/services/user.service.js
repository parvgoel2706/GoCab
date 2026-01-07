const User = require("../models/user.models");
const RefreshToken = require("../models/refresh.model");
const ExpressError = require("../utils/ExpressError");

const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000;
module.exports.createUser = async ({
  fullname,
  email,
  password,
  userAgent,
  ip,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ExpressError(400, "User already exists");
  }
  const hashPassword = await User.hashPassword(password);
  const user = await User.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashPassword,
  });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    userAgent,
    ip,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
  return { user, accessToken, refreshToken };
};

module.exports.userLogin = async ({ email, password, userAgent, ip }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ExpressError(401, "Invalid email or password");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ExpressError(401, "Invalid email or password");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    userAgent,
    ip,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
  return { user, accessToken, refreshToken };
};

module.exports.logoutUser = async (refreshToken) => {
  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }
};
module.exports.logoutAll = async (userId) => {
  if (userId) {
    await RefreshToken.deleteMany({ user: userId });
  }
};
