const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 9999,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, //Primary key
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
