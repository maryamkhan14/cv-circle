import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useSessionStorage } from "../hooks";
import { AUTH_SUCCESS_URL } from "../services/posts-services";

const LoggedIn = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useSessionStorage("user", "");
  const [upvoted, setUpvoted] = useSessionStorage("upvoted", []);
  const [downvoted, setDownvoted] = useSessionStorage("downvoted", []);
  const BaseURL = AUTH_SUCCESS_URL;
  const getUser = () => {
    fetch(BaseURL, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("Authentication has been failed!");
      })
      .then((resObject) => {
        let { name, userId, email, profilePic, voteHistory } = resObject.user;
        let loggedInUser = {
          name,
          userId,
          email,
          profilePic,
        };
        dispatch({ type: "USER_SIGNED_IN", payload: { user: loggedInUser } });
        setUser(loggedInUser);
        setDownvoted(voteHistory.downvoted);
        setUpvoted(voteHistory.upvoted);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className="rounded flex shadow-md border m-3 w-5/6 gap-2 bg-slate-100/50 flex-col justify-center px-3 py-5 font-[700] text-center">
      {" "}
      <h1 className="text-5xl">You're in!</h1>
      <p className="text-2xl">Sending you back...</p>
    </div>
  );
};

export default LoggedIn;
