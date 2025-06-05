const router = require("express").Router();
const User = require("../models").user;
const passport = require("passport");
const {
  registerValidation,
  loginValidation,
  resetValidation,
} = require("../validation");
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

  const foundUser = await User.findOne({ email: req.body.email }).exec();
  if (!foundUser) {
    return res.status(403).send("使用者不存在請重新輸入");
  }
  //jwt
  foundUser.comparePassword(req.body.password, (error, isMatch) => {
    if (isMatch) {
      let tokenObject = { _id: foundUser._id, email: foundUser.email };
      let token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET, {
        expiresIn: "7d",
      }); //base64
      return res.send({
        message: "成功登入",
        token: token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});
//google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    //登入成功給前端token
    if (!req.user) return res.status(400).send("unauthorized");
    const tokenObj = {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    };
    const token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET, {
      expiresIn: "7d",
    });
    return res.redirect(`http://localhost:3000/profile?token=${token}`);
  }
);
//logout session
// router.post("/logout", (req, res) => {
//   req.logOut((err) => {
//     if (err) {
//       return res.send(err);
//     }
//     return res.send("成功登出");
//   });
// });
//forget
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send("此信箱不存在");
  }
  const verificationToken = jwt.sign({ email }, process.env.PASSPORT_SECRET, {
    expiresIn: "10m",
  });
  //模擬
  console.log(`你的驗證碼是${verificationToken}`);
  return res.send({ message: "信箱驗證碼已寄出" });
});

//verify-code
router.post("/verify-code", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.PASSPORT_SECRET);
    return res.send({
      message: "驗證通過",
      email: decoded.email,
    });
  } catch (e) {
    return res.status(400).send({ message: "驗證碼無效或過期" });
  }
});
//更新密碼
router.patch("/reset-password", async (req, res) => {
  let { error } = resetValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { token, email, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.PASSPORT_SECRET);
    if (decoded.email !== email) {
      return res.status(400).send({ message: "信箱與驗證資訊不一致" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "找不到帳號" });
    user.password = newPassword;
    let newData = await user.save();
    return res.send({
      message: "密碼更改成功",
      newData,
    });
  } catch (error) {
    return res.status(400).send("操作錯誤");
  }
});
module.exports = router;
