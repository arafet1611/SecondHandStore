require("./db");
const express = require("express");
require("dotenv").config();
const app = express();
const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
