import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AUTH_SUCCESS_URL } from "../services";

const LoggedIn = () => {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
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
        console.log(resObject);
        let { name, userId, email, profilePic, voteHistory } = resObject.user;
        let user = {
          name,
          userId,
          email,
          profilePic,
          upvoted: voteHistory.upvoted || [],
          downvoted: voteHistory.downvoted || [],
        };
        dispatch({ type: "USER_SIGNED_IN", payload: { user } });
        sessionStorage.setItem("uname", resObject.user.name);
        sessionStorage.setItem("uid", resObject.user.userId);
        sessionStorage.setItem("email", resObject.user.email);
        sessionStorage.setItem("profilePic", resObject.user.profilePic);
        sessionStorage.setItem("upvoted", JSON.stringify(user.upvoted));
        sessionStorage.setItem("downvoted", JSON.stringify(user.downvoted));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (Object.keys(user).length != 0) {
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
