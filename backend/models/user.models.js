const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "first name must be atleast of 3 character"],
    },
    lastname: {
      type: String,
      minlength: [3, "last name must be atleast of 3 character"],
    },
  },
  email: {
    type: String,
    unique: true,
    minlength: [6, "email should be greater than 6 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: String,
});

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    { _id: this._id },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return accessToken;
};
userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { _id: this._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
