const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { errorMiddleware } = require("./middleware/error.middleware");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const captainRouter = require("./routes/captain.route");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/captains", captainRouter);

app.get("/", (req, res) => {
  res.send("Hii from server.");
});

app.use(errorMiddleware);

module.exports = app;
