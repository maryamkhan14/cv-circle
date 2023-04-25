import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoggedIn = () => {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const BaseURL = "http://localhost:5000/auth/success";
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
        dispatch({ type: "USER_SIGNED_IN", payload: { ...resObject.user } });
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
    <div className="flex items-stretch md:items-center justify-center w-full h-full">
      <div className=" bg-green-300 rounded flex shadow-md flex-col gap-5 items-center justify-center border m-3 w-5/6 h-5/6">
        <h1 className="text-5xl">You're in!</h1>
        <h3 className="text-3xl">Sending you back...</h3>
      </div>
    </div>
  );
};

export default LoggedIn;
