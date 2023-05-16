import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { MyBlogCard } from "./MyBlogCard";
import styles from "../assets/css/BlogCard.module.css";

const MAX_NAME_LENGTH = 15;
const MAX_TITLE_LENGTH = 25;
const MAX_STACK_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 230;

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState("");

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setName(data?.userBlog.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          const shortenedDescription =
            blog?.description.length > MAX_DESCRIPTION_LENGTH
              ? blog?.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
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
            name.length > MAX_NAME_LENGTH
              ? name.substring(0, MAX_NAME_LENGTH) + "..."
              : name;

          return (
            <>
              <div className="MarginLeft5d">
                <MyBlogCard
                  id={blog?._id}
                  isUser={localStorage.getItem("userId") === blog?.user?._id}
                  username={shortenedUsername}
                  title={shortenedTitle}
                  stack={shortenedstack}
                  description={shortenedDescription}
                  image={blog?.image}
                  time={moment(blog.createdAt).format("ll")}
                  ago={moment(blog.createdAt).startOf("hour").fromNow()}
                />
              </div>
            </>
          );
        })
      ) : (
        <>
          <p className={styles.blogNotCreated}>
            It seems like you haven't created a blog yet.
          </p>
        </>
      )}
    </>
  );
};

export { MyBlog };
