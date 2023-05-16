import React, { useState } from "react";
import "./assets/css/global.css";
import { LoginPage } from "./pages/LoginPage";
import { BlogPage } from "./pages/BlogPage";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, Navigate } from "react-router-dom";
import { About } from "./components/About";
import { PageNotFound } from "./components/PageNotFound";
import { PostBlog } from "./components/PostBlog";
import { BlogUpdate } from "./pages/BlogUpdate";

const App = () => {
  const [Authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("userId")
  );

  const CheckAuthentication = () => {
    setAuthenticated(!!localStorage.getItem("userId"));
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LoginPage CheckAuthentication={CheckAuthentication} />}
        />
        <Route
          path="/blog"
          element={
            Authenticated ? (
              <BlogPage CheckAuthentication={CheckAuthentication} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/post"
          element={
            Authenticated ? (
              <PostBlog CheckAuthentication={CheckAuthentication} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/blog-update/:id"
          element={
            Authenticated ? (
              <BlogUpdate CheckAuthentication={CheckAuthentication} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/about"
          element={
            Authenticated ? (
              <About CheckAuthentication={CheckAuthentication} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </>
  );
};

const MainApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export { MainApp };
