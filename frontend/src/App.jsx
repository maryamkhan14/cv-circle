import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import useUser from "./features/authentication/hooks/useUser";
import Layout from "./layouts/Layout";
import LoggedIn from "./features/authentication/components/LoggedIn";
import PostForm from "./features/posts/components/PostForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Logout from "./pages/Logout";
import NotPermitted from "./pages/NotPermitted";
import NetworkError from "./pages/NetworkError";
import Profile from "./pages/Profile";
const App = () => {
  let { data } = useUser();
  let [user, setUser] = useState(null);
  useEffect(() => {
    if (data) {
      setUser({ ...data });
    }
  }, [data]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index={true} element={<AllPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logged-in" element={<LoggedIn />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/create-post" element={<PostForm />} />
          <Route path="/post/:id/:updated?" element={<SinglePost />} />
          <Route path="/edit-post/:id" element={<PostForm />} />
          <Route path="/not-permitted" element={<NotPermitted />} />
          <Route path="/network-error" element={<NetworkError />} />
          <Route path="/edit-profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
