import React, { useEffect, useState } from "react";
import styles from "../assets/css/Blog.module.css";
import "../assets/css/global.css";
import profileIcon from "../assets/images/profile-image.png";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { BlogCard } from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ExpansionPanel, {
  ExpansionPanelBody,
  ExpansionPanelHead,
} from "@fellesdatakatalog/expansion-panel";

import { MyBlog } from "../components/MyBlog";

const BlogPage = ({ CheckAuthentication }) => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [hideEverything, sethideEverything] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      toast.success("Successfully signed in!");
      sessionStorage.removeItem("isLoggedIn");
    }
  }, []);

  useEffect(() => {
    const postCreated = sessionStorage.getItem("postCreated");

    if (postCreated === "true") {
      toast.success("Congratulations on creating your blog! Happy blogging!");
      sessionStorage.removeItem("postCreated");
    }
  }, []);

  useEffect(() => {
    const blogDeleted = sessionStorage.getItem("blogDeleted");

    if (blogDeleted === "true") {
      toast.success("Blog deleted!");
      sessionStorage.removeItem("blogDeleted");
    }
  }, []);

  useEffect(() => {
    const blogUpdated = sessionStorage.getItem("blogUpdated");

    if (blogUpdated === "true") {
      toast.success("Blog has just been updated with fresh content.");
      sessionStorage.removeItem("blogUpdated");
    }
  }, []);

  // Get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  const LogOut = () => {
    sethideEverything(false);
    setLoadingSpinner(true);
    setTimeout(() => {
      setLoadingSpinner(false);
      sethideEverything(true);
      CheckAuthentication();
      sessionStorage.setItem("isLoggedOut", "true");
      localStorage.removeItem("userId");
      navigate("/");
    }, 3000);
  };
  const customToastStyle = {
    marginTop: "45px",
  };

  const MAX_NAME_LENGTH = 15;
  const MAX_TITLE_LENGTH = 25;
  const MAX_STACK_LENGTH = 10;
  const MAX_DESCRIPTION_LENGTH = 230;

  return (
    <>
      {loadingSpinner && <LoadingSpinner />}
      {hideEverything && (
        <>
          <div>
            <header className={`${"spaceBetween"} ${styles.header}`}>
              <div></div>
              <div className={styles.navbarHeading}>READER</div>
              <div className="Center">
                <button
                  className={styles.logoutBtn}
                  onClick={() => LogOut()}>
                  Logout
                </button>
                <img
                  className={styles.profileIcon}
                  src={profileIcon}
                  alt="profile icon"
                />
              </div>
            </header>
            <div>
              <div className="spaceBetween">
                <main className={styles.left}>
                  <div className="spaceBetween Margin15">
                    <p className={styles.articleHeading}>Articles</p>
                    <button className={styles.followingBtn}>Following</button>
                  </div>
                  <p className="bottomBorder"></p>
                  {blogs &&
                    blogs.map((blog) => {
                      const shortenedDescription =
                        blog?.description.length > MAX_DESCRIPTION_LENGTH
                          ? blog?.description.substring(
                              0,
                              MAX_DESCRIPTION_LENGTH
                            ) + "..."
                          : blog?.description;
                      const shortenedTitle =
                        blog?.title.length > MAX_TITLE_LENGTH
                          ? blog?.title.substring(0, MAX_TITLE_LENGTH) + "..."
                          : blog?.title;
                      const shortenedstack =
                        blog?.stack.length > MAX_STACK_LENGTH
                          ? blog?.stack.substring(0, MAX_STACK_LENGTH) + "..."
                          : blog?.stack;
                      const shortenedUsername =
                        blog?.user?.username.length > MAX_NAME_LENGTH
                          ? blog?.user?.username.substring(0, MAX_NAME_LENGTH) +
                            "..."
                          : blog?.user?.username;

                      return (
                        <>
                          <div className={`${"Margin15"}`}>
                            <BlogCard
                              id={blog?._id}
                              isUser={
                                localStorage.getItem("userId") ===
                                blog?.user?._id
                              }
                              title={shortenedTitle}
                              stack={shortenedstack}
                              description={shortenedDescription}
                              image={blog?.image}
                              username={shortenedUsername}
                              time={moment(blog.createdAt).format("ll")}
                              ago={moment(blog.createdAt)
                                .startOf("hour")
                                .fromNow()}
                            />
                          </div>
                        </>
                      );
                    })}
                </main>
                <aside className={`${styles.right} ${"MarginAdjust"}`}>
                  <div>
                    <div>
                      <ul className="spaceBetween">
                        <Link
                          to="/post"
                          className="isActiveColor">
                          Post Blog
                        </Link>
                        <Link
                          to="/about"
                          className="isActiveColor">
                          About
                        </Link>
                      </ul>
                    </div>
                    <div className={styles.interestedPeople}>
                      <p className={styles.articleHeading}>
                        People you might be interested
                      </p>
                    </div>
                    <p className="asideBottomBorder"></p>
                  </div>
                  <div>
                    <div className={styles.interestedPeople}>
                      <p className={styles.articleHeading}>My reading list</p>
                    </div>
                    <p className="asideBottomBorder"></p>
                  </div>
                  <div className={styles.interestedPeople}>
                    <ExpansionPanel>
                      <ExpansionPanelHead className={styles.articleHeading}>
                        <p className={styles.articleHeading}>My Blog list</p>
                      </ExpansionPanelHead>
                      <ExpansionPanelBody>
                        <MyBlog />
                      </ExpansionPanelBody>
                    </ExpansionPanel>
                    <p className="asideBottomBorder"></p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
          <ToastContainer toastStyle={customToastStyle} />
        </>
      )}
    </>
  );
};

export { BlogPage };
