import React from "react";
import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./main.css";
import "remixicon/fonts/remixicon.css";
import useCurrentUser from "./features/authentication/hooks/useCurrentUser";
import { useSessionStorage } from "./hooks/index";
import Layout from "./layouts/Layout";
import LoggedIn from "./features/authentication/components/LoggedIn";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import NetworkError from "./pages/NetworkError";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import RegularLayout from "./layouts/RegularLayout";
const App = () => {
  const [voteHistory, setVoteHistory] = useSessionStorage("voteHistory", {});
  let { data, isFetching, error } = useCurrentUser({ voteHistory } || {});
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (data && !voteHistory) {
      // load existing vote history if no changes during session
      setVoteHistory(data.voteHistory);
    }
    if (data) {
      setUser(data);
    }
    if (error && user) {
      setUser(null);
      setVoteHistory({});
    }
  }, [data, error]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Layout user={user} setUser={setUser} />}
        errorElement={<NetworkError />}
      >
        <Route errorElement={<NetworkError />}>
          <Route
            path="/"
            element={<RegularLayout user={user} setUser={setUser} />}
          >
            <Route index={true} element={<AllPosts />} />
            <Route path="/logged-in" element={<LoggedIn />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/post/:id/:updated?" element={<SinglePost />} />
            <Route path="/post/:id/:updated?" element={<SinglePost />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path={user || isFetching ? "/profile/:id?" : "/profile/:id"}
              element={<Profile />}
            />
            {!user && <Route path="/login" element={<Login />} />}
            {!user && <Route path="/signup" element={<Signup />} />}
            {user && <Route path="/create-post" element={<CreatePost />} />}
            {user && <Route path="/edit-post/:id" element={<EditPost />} />}
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
