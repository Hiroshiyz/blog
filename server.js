const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth-route");
mongoose
  .connect("mongodb://127.0.0.1:27017/testDB")
  .then(() => {
    console.log("已成功連接mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//setting router
app.use("/auth/api", authRoutes);

app.listen(8080, () => {
  console.log("server port 8080 running..");
});
