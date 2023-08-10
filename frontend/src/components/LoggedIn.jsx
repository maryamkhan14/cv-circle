import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useSessionStorage } from "../hooks";
import { getAuthStatus } from "../services/auth-services";
import ReportButton from "./ReportButton";

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
      navigate("/");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
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
            <span className="flex justify-center self-center gap-3 flex-col md:flex-row">
              Error message:{" "}
              <p className="text-amber-800">
                {error.message || "[no error message found]"}
              </p>
            </span>
            <ReportButton />
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
