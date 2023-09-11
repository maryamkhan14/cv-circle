import "./main.css";
import "remixicon/fonts/remixicon.css";
import React from "react";
import { useState, useEffect, Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import useCurrentUser from "./features/authentication/hooks/useCurrentUser";
import { useSessionStorage } from "./hooks/index";
import Layout from "./layouts/Layout";
const RegularLayout = lazy(() => import("./layouts/RegularLayout"));
const NetworkError = lazy(() => import("./pages/NetworkError"));
const AllPosts = lazy(() => import("./pages/AllPosts"));
const Login = lazy(() => import("./pages/Login"));
const LoggedIn = lazy(() =>
  import("./features/authentication/components/LoggedIn")
);
const Logout = lazy(() => import("./pages/Logout"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const EditPost = lazy(() => import("./pages/EditPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
import LoadingSvg from "./assets/LoadingSvg";
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
            <Route
              index={true}
              element={
                <Suspense
                  fallback={
                    <div className="w-12 h-12 self-center">
                      <LoadingSvg />
                    </div>
                  }
                >
                  <AllPosts />
                </Suspense>
              }
            />
            {!user && (
              <Route
                path="/login"
                element={
                  <Suspense
                    fallback={
                      <div className="w-12 h-12 self-center">
                        <LoadingSvg />
                      </div>
                    }
                  >
                    <Login />
                  </Suspense>
                }
              />
            )}
            <Route
              path="/logged-in"
              element={
                <Suspense>
                  <LoggedIn />
                </Suspense>
              }
            />
            <Route
              path="/logout"
              element={
                <Suspense
                  fallback={
                    <div className="w-12 h-12 self-center">
                      <LoadingSvg />
                    </div>
                  }
                >
                  <Logout />
                </Suspense>
              }
            />
            {!user && (
              <Route
                path="/signup"
                element={
                  <Suspense
                    fallback={
                      <div className="w-12 h-12 self-center">
                        <LoadingSvg />
                      </div>
                    }
                  >
                    <Signup />
                  </Suspense>
                }
              />
            )}
            <Route
              path={user || isFetching ? "/profile/:id?" : "/profile/:id"}
              element={
                <Suspense
                  fallback={
                    <div className="w-12 h-12 self-center">
                      <LoadingSvg />
                    </div>
                  }
                >
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/post/:id"
              element={
                <Suspense
                  fallback={
                    <div className="w-12 h-12 self-center">
                      <LoadingSvg />
                    </div>
                  }
                >
                  <SinglePost />
                </Suspense>
              }
            />
            {user && (
              <Route
                path="/create-post"
                element={
                  <Suspense
                    fallback={
                      <div className="w-12 h-12 self-center">
                        <LoadingSvg />
                      </div>
                    }
                  >
                    <CreatePost />
                  </Suspense>
                }
              />
            )}
            {user && (
              <Route
                path="/edit-post/:id"
                element={
                  <Suspense
                    fallback={
                      <div className="w-12 h-12 self-center">
                        <LoadingSvg />
                      </div>
                    }
                  >
                    <EditPost />
                  </Suspense>
                }
              />
            )}
            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <div className="w-12 h-12 self-center">
                      <LoadingSvg />
                    </div>
                  }
                >
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
