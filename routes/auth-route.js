const router = require("express").Router();
const User = require("../models").user;
const { registerValidation, loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");
//auth middleware
router.use((req, res, next) => {
  console.log("auth router is request now");
  next();
});
//test用
router.get("/testAPI", (req, res) => {
  return res.send("測試auth有成功連接");
});

//register
router.post("/register", async (req, res) => {
  //查看格式是否有錯誤
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //確認信箱是否被註冊過?
  const emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) {
    return res.status(403).send("此信箱已被註冊過");
  }
  let { name, email, password } = req.body;
  try {
    let newUser = new User({
      name,
      email,
      password,
    });
    let saveUser = await newUser.save();
    return res.send({
      message: "你已成功註冊會員!",
      saveUser,
    });
  } catch (error) {
    return res.status(500).send("無法儲存使用者" + error.message);
  }
});
//login
router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //確認信箱是否被註冊過?
  const foundUser = await User.findOne({ email: req.body.email }).exec();
  if (!foundUser) {
    return res.status(403).send("使用者不存在請重新輸入");
  }
  //jwt
  foundUser.comparePassword(req.body.password, (error, isMatch) => {
    if (isMatch) {
      let tokenObject = { _id: foundUser._id, email: foundUser.email };
      let token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET, {
        expiresIn: "1h",
      }); //base64
      return res.send({
        message: "成功登入",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});
//logout
router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res.send(err);
    }
    return res.send("成功登出");
  });
});

module.exports = router;
