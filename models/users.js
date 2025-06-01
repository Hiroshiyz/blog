const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
//setting User Database
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  password: {
    type: String, //不設定require是因為google的資料不必將密碼放進
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//instance method
userSchema.methods.comparePassword = async function (password, callbackFn) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return callbackFn(null, result); // true of false value
  } catch (error) {
    return callbackFn(error, result);
  }
};
//middleware
//使用者為新用戶 和 更改過的密碼要在這裡 hash過
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const hashValue = await bcrypt.hash(this.password, 12);
    this.password = hashValue;
  }
  next();
});
module.exports = mongoose.model("User", userSchema);
