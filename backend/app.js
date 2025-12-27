const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hii from server.");
});

app.use(errorMiddleware);

module.exports = app;
