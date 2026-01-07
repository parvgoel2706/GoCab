const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      require: true,
      minlength: [3, "Firstname should be atleast 3 character long."],
    },
    lastname: {
      type: String,
      minlength: [3, "Lastname should be atleast 3 character long."],
    },
  },
  email: {
    type: String,
    required: true,
    minlength: [6, "email should be greater than 6 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Lastname should be atleast 3 character long."],
    },
    plate: {
      type: String,
      required: true,
      minlength: [7, "Plate number must be 7 character long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be atleast 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAccessToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return token;
};
captainSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

captainSchema.statics.hashPassword = async function (password) {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;
