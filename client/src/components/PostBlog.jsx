import React, { useState } from "react";
import styles from "../assets/css/PostBlog.module.css";
import "../assets/css/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeading,
  faPuzzlePiece,
  faFileAlt,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
axios.defaults.baseURL = `http://localhost:8080`;
import { useNavigate } from "react-router-dom";

const PostBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    stack: "",
    description: "",
    image: "",
  });
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  const OnBlogDataValueChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setBlogData((prev) => {
      return {
        ...prev,
        [Name]: Value,
      };
    });
  };
  const SubmitBlogData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/blog/create-blog", {
        title: blogData.title,
        stack: blogData.stack,
        description: blogData.description,
        image: blogData.image,
        user: id,
      });
      if (data?.success) {
        sessionStorage.setItem("postCreated", "true");
        navigate("/blog");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
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
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export { PostBlog };
