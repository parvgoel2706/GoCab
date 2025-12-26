const app = require("./app");
const connectDb = require("./db/db");
const PORT = process.env.PORT || 8080;

connectDb();
app.listen(PORT, () => {
  console.log("server is running on PORT: ", PORT);
});
