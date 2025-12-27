const userModel = require("../models/user.models");
const ExpressError = require("../utils/ExpressError");

module.exports.createUser = async ({ fullname, email, password }) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new ExpressError(400, "User already exists");
  }
  const hashPassword = await userModel.hashPassword(password);
  const user = await userModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashPassword,
  });
  const token = user.generateAuthToken();
  return { user, token };
};

module.exports.userLogin = async ({ email, password }) => {
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ExpressError(401, "Invalid email or password");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ExpressError(401, "Invalid email or password");
  }
  const token = await user.generateAuthToken();
  return { token, user };
};
