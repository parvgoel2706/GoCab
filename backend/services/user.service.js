const userModel = require("../models/user.models");

module.exports.createUser = async ({ fullname, email, password }) => {
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
