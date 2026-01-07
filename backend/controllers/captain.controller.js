const captainService = require("../services/captain.service");
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
  path: "captain/refresh",
};

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const { fullname, email, password, vehicle } = req.body;
    const { captain, accessToken, refreshToken } =
      await captainService.registerCaptain({
        fullname,
        email,
        password,
        vehicle,
        userAgent: req.headers["user-agent"],
        ip: req.ip,
      });
    res.cookie("captain_accessToken", accessToken, accessTokenOptions);
    res.cookie("captain_refreshToken", refreshToken, refreshTokenOptions);
    res.status(201).json({
      captain: {
        id: captain._id,
        fullname: captain.fullname,
        email: captain.email,
        vehicle: captain.vehicle,
        status: captain.status,
      },
    });
  } catch (err) {
    next(err);
  }
};
