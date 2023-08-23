import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import useUser from "./features/authentication/hooks/useUser";
import { useSessionStorage } from "./hooks/index";
import Layout from "./layouts/Layout";
import LoggedIn from "./features/authentication/components/LoggedIn";
import { StatusContextProvider } from "./features/notifications/context/StatusContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Logout from "./pages/Logout";
import NotPermitted from "./pages/NotPermitted";
import NetworkError from "./pages/NetworkError";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
const App = () => {
  const [voteHistory, setVoteHistory] = useSessionStorage("voteHistory", {});
  let { data } = useUser({ voteHistory } || {});
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (data && !voteHistory) {
      // load existing vote history if no changes during session
      console.log("no vote history found");
      setVoteHistory(data.voteHistory);
    }
    if (data) {
      setUser(data);
    }
  }, [data]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route
            index={true}
            element={
              <StatusContextProvider>
                <AllPosts />
              </StatusContextProvider>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logged-in" element={<LoggedIn />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/create-post"
            element={
              <StatusContextProvider>
                <CreatePost />
              </StatusContextProvider>
            }
          />
          <Route
            path="/post/:id/:updated?"
            element={
              <StatusContextProvider>
                <SinglePost />
              </StatusContextProvider>
            }
          />
          <Route
            path="/edit-post/:id"
            element={
              <StatusContextProvider>
                <EditPost />
              </StatusContextProvider>
            }
          />
          <Route path="/not-permitted" element={<NotPermitted />} />
          <Route path="/network-error" element={<NetworkError />} />

          <Route
            path="/edit-profile"
            element={
              <StatusContextProvider>
                <Profile />
              </StatusContextProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
