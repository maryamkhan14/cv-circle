import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./main.css";
import Layout from "./layouts/Layout";
import { UserContextProvider } from "./features/authentication/context/UserContext";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
  </UserContextProvider>
);
