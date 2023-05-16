const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogControlller,
} = require("../controllers/blogController");

// Router Object
const router = express.Router();

// Routes

// GET || All blogs
router.get("/all-blog", getAllBlogsController);

// POST || Create blog
router.post("/create-blog", createBlogController);

// PUT || Update blog
router.patch("/update-blog/:id", updateBlogController);

// GET || Single blog detail
router.get("/get-blog/:id", getBlogByIdController);

// DELETE || Delete blog
router.delete("/delete-blog/:id", deleteBlogController);

// GET || User blog
router.get("/user-blog/:id", userBlogControlller);

module.exports = router;
