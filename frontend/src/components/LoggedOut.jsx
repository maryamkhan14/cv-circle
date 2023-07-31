import React from "react";
import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoggedOut = () => {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const BaseURL = "https://cv-circle.com/api/auth/logout";

  const logOutUser = () => {
    axios
      .post(BaseURL, {}, { withCredentials: true })
      .then((response) => {
        dispatch({ type: "USER_SIGNED_OUT", payload: null });
        sessionStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    logOutUser();
  }, []);
  useEffect(() => {
    if (Object.keys(user).length == 0) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="rounded flex shadow-md border m-3 w-5/6 gap-2 bg-slate-100/50 flex-col justify-center px-3 py-5 font-[700] text-center">
      {" "}
      <h1 className="text-5xl">You're logged out!</h1>
      <h3 className="text-3xl">Sending you back...</h3>
    </div>
  );
};

export default LoggedOut;
