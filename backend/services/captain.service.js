const captainModel = require("../models/captain.model");
const ExpressError = require("../utils/ExpressError");
const RefreshToken = require("../models/refresh.model");

const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000;
module.exports.registerCaptain = async ({
  fullname,
  email,
  password,
  vehicle,
  userAgent,
  ip,
}) => {
  const existingCaptain = await captainModel.findOne({ email });
  if (existingCaptain) {
    throw new ExpressError(400, "Captain already exists");
  }
  const hashPassword = await captainModel.hashPassword(password);
  const captain = await captainModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashPassword,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    },
  });
  const accessToken = captain.generateAccessToken();
  const refreshToken = captain.generateRefreshToken();
  await RefreshToken.create({
    user: captain._id,
    token: refreshToken,
    userAgent,
    ip,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
  return { captain, accessToken, refreshToken };
};
