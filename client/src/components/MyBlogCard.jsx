import React from "react";
import styles from "../assets/css/MyBlogCard.module.css";
import "../assets/css/global.css";
import profileIcon from "../assets/images/profile-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const MyBlogCard = ({
  id,
  isUser,
  username,
  title,
  description,
  stack,
  image,
  time,
  ago,
}) => {
  return (
    <div
      key={id}
      className={styles.MarginTop}>
      <div className="spaceBetween">
        <div>
          <div className={`${"alignRow MarginBottom10"} ${styles.leftWidth}`}>
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
          <div className="MarginBottom10">
            <p className={`${styles.blogTitle} ${"MarginBottom10"}`}>{title}</p>
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
        <FontAwesomeIcon
          icon={faEdit}
          className={`${styles.fontAwesomeIcon} ${styles.iconBlue}`}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className={`${styles.fontAwesomeIcon} ${styles.iconRed}`}
        />
      </div>
      <p className="blogCardBottomBorder"></p>
    </div>
  );
};

export { MyBlogCard };
