const ExpressError = require("../utils/ExpressError");
const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");

const userAuthMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new ExpressError(404, "Unauthorized request");
    }
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await userModel.findById(decode._id);
    if (!user) {
      throw new ExpressError(404, "Invalid token");
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = userAuthMiddleware;
