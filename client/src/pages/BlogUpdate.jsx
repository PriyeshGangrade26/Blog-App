import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../assets/css/PostBlog.module.css";
import "../assets/css/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeading,
  faPuzzlePiece,
  faFileAlt,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

const BlogUpdate = () => {
  const [blog, setBlog] = useState({});
  const [blogData, setBlogData] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();

  // Get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setBlogData({
          title: data?.blog.title,
          stack: data?.blog.stack,
          description: data?.blog.description,
          image: data?.blog.image,
          user: data?.blog.user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // Input change
  const OnBlogDataValueChange = (e) => {
    setBlogData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form
  const SubmitBlogData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(`/blog/update-blog/${id}`, {
        title: blogData.title,
        stack: blogData.stack,
        description: blogData.description,
        image: blogData.image,
        user: blogData.user,
      });
      if (data?.success) {
        sessionStorage.setItem("blogUpdated", "true");
        navigate("/blog");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blog);
  return (
    <>
      <div className={styles.pageCenter}>
        <div>
          {/* Form Data Card */}
          <form
            className={`${styles.formDataCard} ${styles.MarginTop}`}
            onSubmit={SubmitBlogData}>
            <div className={styles.blogSubHeading}>Title</div>
            <label className={styles.flexRow}>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={OnBlogDataValueChange}
                placeholder="Title"
                className={styles.blogInput}
              />
              <FontAwesomeIcon
                icon={faHeading}
                className={styles.fontAwesomeIcon}
              />
            </label>
            {/* {loginEmailError && (
              <span className={styles.displayError}>{loginEmailError}</span>
            )} */}
            <div className={styles.blogSubHeading}>Stack</div>
            <label className={styles.flexRow}>
              <input
                type="text"
                name="stack"
                value={blogData.stack}
                onChange={OnBlogDataValueChange}
                placeholder="Front End, Back End, Full Stack"
                className={styles.blogInput}
              />
              <FontAwesomeIcon
                icon={faPuzzlePiece}
                className={styles.fontAwesomeIcon}
              />
            </label>
            {/* {loginEmailError && (
              <span className={styles.displayError}>{loginEmailError}</span>
            )} */}
            <div className={styles.blogSubHeading}>Description</div>
            <label className={styles.flexRow}>
              <textarea
                type="text"
                name="description"
                value={blogData.description}
                onChange={OnBlogDataValueChange}
                placeholder="Description"
                className={styles.stopResize}
              />
              <FontAwesomeIcon
                icon={faFileAlt}
                className={styles.fontAwesomeIcon}
              />
            </label>
            {/* {loginEmailError && (
              <span className={styles.displayError}>{loginEmailError}</span>
            )} */}
            <div className={styles.blogSubHeading}>Image</div>
            <label className={styles.flexRow}>
              <input
                type="text"
                name="image"
                value={blogData.image}
                onChange={OnBlogDataValueChange}
                placeholder="Image"
                className={styles.blogInput}
              />
              <FontAwesomeIcon
                icon={faImage}
                className={styles.fontAwesomeIcon}
              />
            </label>
            {/* {loginEmailError && (
              <span className={styles.displayError}>{loginEmailError}</span>
            )} */}
            {/* Log In Button */}
            <button
              className={styles.submitBtn}
              type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export { BlogUpdate };
