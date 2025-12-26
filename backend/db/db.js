const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database is successfully connected"))
    .catch((e) => console.log("ERROR", e));
};
module.exports = connectDb;
