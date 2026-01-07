const ExpressError = require("../utils/ExpressError");
const captainModel = require("../models/captian.model");
const jwt = require("jsonwebtoken");

const captainAuthMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new ExpressError(404, "Unauthorized request");
    }
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const captain = await captainModel.findById(decode._id);
    if (!captain) {
      throw new ExpressError(404, "Invalid token");
    }
    req.captain = captain;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = captainAuthMiddleware;
