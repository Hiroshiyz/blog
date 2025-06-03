const router = require("express").Router();
const Post = require("../models").post;
const { postValidation } = require("../validation");

router.use((req, res, next) => {
  console.log("正在連接post router");
  next();
});
router.get("/testAPI", (req, res) => {
  return res.send("這是post....");
});

//全部貼文
router.get("/", async (req, res) => {
  try {
    let allPosts = await Post.find({})
      .populate({
        path: "author",
        select: "name",
      })
      .exec();
    return res.send(allPosts);
  } catch (e) {
    return res.status(500).send(e);
  }
});
//根據作者id顯示貼文
router.get("/author/:author_id", async (req, res) => {
  let { author_id } = req.params;
  try {
    let foundPost = await Post.find({ author: author_id }).populate("author", [
      "name",
    ]);
    return res.send(foundPost);
  } catch (error) {
    return res.status(500).send(e);
  }
});
//根據貼文id搜尋貼文
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundPost = await Post.findOne({ _id })
      .populate("author", ["name, email"])
      .exec();
    if (!foundPost) {
      return res.send("找不到此課程");
    }

    return res.send({
      message: "找到特定課程",
      foundPost,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});
//新增貼文
router.post("/", async (req, res) => {
  let { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { title, description } = req.body;
  try {
    let newPost = new Post({
      title,
      description,
      author: req.user._id,
    });
    let savePost = await newPost.save();
    return res.send({
      message: "成功新增貼文",
      savePost,
    });
  } catch (e) {
    return res.status(500).send("無法創建課程");
  }
});
//更新貼文
router.patch("/:_id", async (req, res) => {
  //驗證
  let { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { _id } = req.params;
  try {
    let foundPost = await Post.findOne({ _id }).exec();
    if (!foundPost) {
      return res.status(400).send("該課程不存在");
    }
    if (foundPost.author.equals(req.user._id)) {
      let updatePost = await Post.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      }).exec();
      return res.send({
        message: "更改成功",
        updatePost,
      });
    } else {
      return res.status(403).send("你不是該作者");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});
//刪除貼文
router.delete("/:_id", async (req, res) => {
  let { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { _id } = req.params;
  try {
    let foundPost = await Post.findOne({ _id }).exec();
    if (!foundPost) {
      return res.status(400).send("該課程不存在");
    }
    if (foundPost.author.equals(req.user._id)) {
      let deletePost = await Post.findOneAndDelete({ _id }).exec();
      return res.send({
        message: "已刪除該課程",
        deletePost,
      });
    } else {
      return res.status(403).send("你不是該作者");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
