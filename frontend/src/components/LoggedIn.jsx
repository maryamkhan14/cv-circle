import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useSessionStorage } from "../hooks";
import { getAuthStatus } from "../services/auth-services";

const LoggedIn = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useSessionStorage("user", "");
  const [error, setError] = useState({});
  const [upvoted, setUpvoted] = useSessionStorage("upvoted", []);
  const [downvoted, setDownvoted] = useSessionStorage("downvoted", []);

  const getUser = async () => {
    let { user: loggedInUser, error } = await getAuthStatus();
    if (error) {
      setError(error);
    } else {
      let { name, userId, email, profilePic, voteHistory } = loggedInUser;
      let profile = {
        name,
        userId,
        email,
        profilePic,
      };
      dispatch({ type: "USER_SIGNED_IN", payload: { user: profile } });
      setUser(profile);
      setDownvoted(voteHistory.downvoted);
      setUpvoted(voteHistory.upvoted);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="rounded flex shadow-md border m-3 w-5/6 gap-5 bg-slate-100/50 flex-col justify-center px-3 py-5 font-[700] text-center">
      {Object.keys(error).length ? (
        <>
          <span className="flex flex-col justify-center border-b-2 border-slate-50 gap-5 h-1/2">
            <h1 className="text-5xl">Login failed :(</h1>
            <p className="text-2xl">
              Something went wrong. Our team will be looking into this.
            </p>
          </span>
          <span className="flex flex-col gap-5 py-3 h-1/2 justify-center">
            <h2 className="text-3xl">The details:</h2>
            <span className="flex justify-center self-center gap-3">
              Error code:{" "}
              <p className="text-amber-800">
                {error.status || "[no error code found]"}
              </p>
            </span>
            <span className="flex justify-center self-center gap-3">
              Error message:{" "}
              <p className="text-amber-800">
                {error.message || "[no error message found]"}
              </p>
            </span>
            <a
              href="https://github.com/maryamkhan14/cv-circle/issues"
              className="flex w-auto self-center items-center justify-center p-5 text-base font-medium rounded border-2 border-slate-700 bg-slate-50 hover:bg-slate-100"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                fill="none"
                className="w-10 mr-2 stroke-amber-800"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="w-full text-lg font-bold text-amber-800 ">
                Report this issue!
              </span>
              <svg
                className="w-6 ml-2 stroke-amber-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </span>
        </>
      ) : (
        <>
          <h1 className="text-5xl">You're in!</h1>
          <p className="text-2xl">Sending you back...</p>
        </>
      )}
    </div>
  );
};

export default LoggedIn;
