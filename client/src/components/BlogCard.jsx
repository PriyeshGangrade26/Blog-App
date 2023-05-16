import React from "react";
import styles from "../assets/css/BlogCard.module.css";
import "../assets/css/global.css";
import profileIcon from "../assets/images/profile-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogCard = ({
  id,
  isUser,
  title,
  description,
  stack,
  image,
  username,
  time,
  ago,
}) => {
  const navigate = useNavigate();

  const BlogEdit = () => {
    navigate(`/blog-update/${id}`);
  };

  const BlogDelete = async () => {
    try {
      const { data } = await axios.delete(`/blog/delete-blog/${id}`);
      if (data?.success) {
        sessionStorage.setItem("blogDeleted", "true");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={id}>
      <div className="spaceBetween">
        <div>
          <div className="alignRow MarginBottom15 leftWidth">
            <img
              className={styles.profileIcon}
              src={profileIcon}
              alt="profile icon"
            />
            <div className="CenterInCol">
              <div className="alignRowCenter">
                <p className={styles.userName}>{username}</p>
                <p className={styles.userName}>•</p>
                <p className={styles.postDate}>{time}</p>
              </div>
              <p className={styles.userPosition}>{stack} Developer</p>
            </div>
          </div>
          <div className="MarginBottom15">
            <p className={`${styles.blogTitle} ${"MarginBottom15"}`}>{title}</p>
            <p className={styles.blogDescription}>{description}</p>
          </div>
        </div>
        <div className="Center MarginLeft15">
          <img
            className={styles.blogImage}
            src={image}
            alt="profile icon"
          />
        </div>
      </div>
      <div className="alignCenter">
        <p className={styles.chip}>{stack}</p>
        <p className={styles.chip}>{ago}</p>
        {isUser && (
          <>
            <FontAwesomeIcon
              icon={faEdit}
              className={`${styles.fontAwesomeIcon} ${styles.iconBlue}`}
              onClick={() => BlogEdit()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className={`${styles.fontAwesomeIcon} ${styles.iconRed}`}
              onClick={() => BlogDelete()}
            />
          </>
        )}
      </div>
      <p className="blogCardBottomBorder"></p>
      <ToastContainer />
    </div>
  );
};

export { BlogCard };
