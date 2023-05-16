const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

// Get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message:
          "No blogs found. Please check back later or try a different search.",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: " Here are all the blog posts that match your search criteria.",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:
        "There was an error while retrieving blog posts. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Create blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, stack, description, image, user } = req.body;
    // Validation
    if (!title || !stack || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message:
          "Please provide all fields. You must fill out all required fields before submitting the form.",
      });
    }
    const exisitingUser = await userModel.findById(user);
    // Validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message:
          "Unable to find user. Please check the user ID or contact support for assistance.",
      });
    }

    const newBlog = new blogModel({ title, stack, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Congratulations on creating your blog! Happy blogging!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while creating the blog post. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Update blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, stack, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while updating the blog post. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Single blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message:
          "Blog not found with this ID. Please check the blog ID or contact support for assistance.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blog post retrieved successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while retrieving the blog post. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Delete blog
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog post deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while deleting the blog post. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Get user blog
exports.userBlogControlller = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message:
          "Blogs not found with this ID. Please check the blog ID or contact support for assistance.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Retrieved user blogs successfully!",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while retrieving user blogs. Please try again later or contact support for assistance.",
      error,
    });
  }
};
