const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes").auth;
const postRoutes = require("./routes").post;
const passport = require("passport");
require("./config/passport")(passport);
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
app.use((err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).send("伺服器發生錯誤");
});
app.set("view engine", "ejs");

//setting router
app.use("/api/auth", authRoutes);
app.use(
  "/api/post",
  passport.authenticate("jwt", { session: false }),
  postRoutes
);
app.listen(8080, () => {
  console.log("server port 8080 running..");
});
